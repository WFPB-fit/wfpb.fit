import React, { Component } from 'react';

import { titleize, getRandomColor } from '../utils/GeneralUtils.jsx';
import FullNutritionInfo from '../assets/data/nutrition/fullNutritionInfo.json';
// import exampleFDAdata from '../assets/data/nutrition/exampleFDA.json';
// console.log(exampleFDAdata)
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {
	VictoryChart, VictoryAxis, VictoryLegend, VictoryLabel,
	VictoryTooltip, VictoryLine, VictoryVoronoiContainer
} from 'victory';
import { getLink } from '../utils/GeneralUtils.jsx';

// import FdaApi from '../utils/FdaApi.js';
// FdaApi.getFullNutritionInfo();
console.log(FullNutritionInfo)

export default class Food extends Component {
	static getFoodNutrients(food, nutrientKey) { return food.nutrients[nutrientKey]; }

	constructor(props) {
		super(props);
		//bind functions
		this.getVictoryData = this.getVictoryData.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);

		//init vars
		this.allSelectableFoods = Food.convertFoodsToSelectObjects(FullNutritionInfo)
		this.indexedFoods = FullNutritionInfo.reduce((map, obj) => { //index the foods by their name and add extra props, like color
			map[obj.name] = obj;
			obj.color = getRandomColor();
			return map;
		}, {});
		this.state = {
			selectedFoods: [this.allSelectableFoods[0]]
		}
	}
	handleSelectChange(value) {
		this.setState({ selectedFoods: value });
	}
	static convertFoodsToSelectObjects(foods) {
		const optns = foods.map((x) => { return { value: x.name, label: titleize(x.name) } });
		const alphaOptions = optns.sort((a, b) => a.value.localeCompare(b.value)); //alphabetize it
		return alphaOptions;
	}

	getVictoryData(foodData, name, color) {
		return Object.keys(foodData).map(key => {
			return { x: key, y: foodData[key], name: name, color: color };
		});
	}

	static getVictoryTooltipLabel(d) {
		let unit = 'Grams';
		let val = d.y;
		if (val !== 0) {
			if (d.y < 1e-3) { val *= 1e6; unit = 'MicroGrams'; }
			else if (d.y < 1) { val *= 1e3; unit = 'MilliGrams'; }
		}
		const formattedVal = Number(val.toFixed(2));
		return `${d.name}: \n${d.x}: ${formattedVal} ${unit}`
	}

	createVictoryLineChart(selectedFoods, getNutrients, title, nutrientDataKey, w = 200, h = 200) {
		const selectDataColor = function (d, active) { return d.color; };
		const axisStyle = {
			ticks: { stroke: "grey", size: 3 },
			tickLabels: { fontSize: 5, padding: 1 },
		};
		let xAxisStyle = Object.assign({}, axisStyle);
		xAxisStyle.tickLabels.textAnchor = 'start';
		xAxisStyle.tickLabels.angle = 45;

		const lines = selectedFoods.map(food => {
			return (
				<VictoryLine
					key={food.name}
					data={this.getVictoryData(getNutrients(food, nutrientDataKey), food.name, food.color)}
					style={{
						data: {
							stroke: food.color,
							strokeWidth: (d, active) => { return active ? 2 : 1; }
						}
					}}
				/>
			)
		});


		return (
			<VictoryChart height={h} width={w}
				domainPadding={{ y: 10 }}
				padding={{ bottom: 50, left: 30, right: 20, top: 10 }}
				containerComponent={
					//setup tool tip
					<VictoryVoronoiContainer
						dimension="x"
						labels={Food.getVictoryTooltipLabel}
						labelComponent={
							<VictoryTooltip
								style={{
									fontSize: 4,
									padding: 2
								}}
								cornerRadius={5}
								flyoutStyle={{ fill: "white" }}
							/>}
					/>}
			>
				<VictoryLabel
					x={w / 2} y={10}
					text={title}
					textAnchor='middle'
				/>
				<VictoryAxis independentAxis
					style={axisStyle}
				/>
				<VictoryAxis dependentAxis
					style={xAxisStyle}
				/>
				<VictoryLegend x={w * 0.7} y={20}
					orientation="vertical"
					gutter={5}
					style={{
						labels: { fontSize: 4 },
						data: { stroke: selectDataColor, fill: selectDataColor }
					}}
					data={selectedFoods}
				/>
				{lines}
			</VictoryChart>
		);
	}
	render() {
		const selectedFoods = this.state.selectedFoods.map(selectedFood => {
			return this.indexedFoods[selectedFood.value];
		}, []);

		let dataVis = null;
		if (selectedFoods.length > 0) {
			const graphs = (<div>
				{this.createVictoryLineChart(selectedFoods, Food.getFoodNutrients, "Energy", 'energy')}
				{this.createVictoryLineChart(selectedFoods, Food.getFoodNutrients, "Micronutrients", 'misc')}
				{this.createVictoryLineChart(selectedFoods, Food.getFoodNutrients, "Vitamins", 'vitamins')}
				{this.createVictoryLineChart(selectedFoods, Food.getFoodNutrients, "Minerals", 'minerals')}
				{this.createVictoryLineChart(selectedFoods, Food.getFoodNutrients, "Amino Acids", 'amino')}
			</div>);
			const sources = (
				<div>
					<h2>Sources</h2>
					<ul>
						{
							selectedFoods.map(food => {
								return (
									<li key={food.name}>
										{getLink(food.src, food.name)}
									</li>
								)
							})
						}
					</ul>
				</div>
			);
			dataVis = (
				<div>{graphs}{sources}</div>
			);
		} else {
			dataVis = (<div>
				<p>Enter a tag in the search bar to display info</p>
			</div>);
		}

		return (
			<div>
				<Select
					name="form-field-name"
					value={this.state.selectedFoods}
					onChange={this.handleSelectChange}
					options={this.allSelectableFoods}
					joinValues
					multi
				/>
				{dataVis}
			</div>
		);
	}
}
