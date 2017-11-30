import React, { Component } from 'react';

import { titleize, getRandomColor } from '../utils/GeneralUtils.jsx';
import VirtualizedSelect from 'react-virtualized-select'
import {
	VictoryChart, VictoryAxis, VictoryLegend, VictoryLabel,
	VictoryTooltip, VictoryLine, createContainer
} from 'victory';
import { getLink } from '../utils/GeneralUtils.jsx';

import FoodNutrientAmounts from '../assets/data/nutrition/parsed/amount.json';
import FoodNames from '../assets/data/nutrition/parsed/foodNames.json';
import NutrientNames from '../assets/data/nutrition/parsed/nutrients.json';
import ServingSizes from '../assets/data/nutrition/parsed/servingSizes.json';

export default class Food extends Component {
	static getFoodNutrients(food, nutrientKey) { return food.nutrients[nutrientKey]; }

	constructor(props) {
		super(props);
		//bind functions
		this.getVictoryData = this.getVictoryData.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.preprocessSelectedFoods = this.preprocessSelectedFoods.bind(this);

		//init vars
		this.allSelectables = Object.keys(FoodNames).map(id=>{
			return {value: id, name: FoodNames[id]};
		});
		this.state = {
			selectedFoods: [this.allSelectables[0]]
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

		const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

		return (
			<VictoryChart height={h} width={w}
				domainPadding={{ y: 10 }}
				padding={{ bottom: 50, left: 30, right: 10, top: 10 }}
				containerComponent={
					//setup tool tip
					<VictoryZoomVoronoiContainer
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
					/>
				}
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

	preprocessSelectedFoods(){
		let selectedFoods = this.state.selectedFoods.map(selectedFood => {
			return FoodNutrientAmounts[selectedFood.value];
		}, []);
		console.log(selectedFoods)
	}

	render() {
		const selectedFoods = this.preprocessSelectedFoods();

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
				selectedFoods.map(food => {
					return (
						<li key={food.name}>
							{getLink(food.src, food.name)}
						</li>
					)
				})
			);
			dataVis = (
				<div>
					{graphs}
					<h2>Sources</h2>
					<ul>
						{sources}
					</ul>
					<h2>Notes</h2>
					<ul>
						<li>Missing data points indicate the USDA does not have data available on that nutrient</li>
					</ul>
				</div>
			);
		} else {
			dataVis = (<div>
				<p>Enter a tag in the search bar to display info</p>
			</div>);
		}

		return (
			<div>
				<VirtualizedSelect
					name="form-field-name"
					value={this.state.selectedFoods}
					onChange={this.handleSelectChange}
					options={this.allSelectables}
					joinValues
					multi
				/>
				{dataVis}

			</div>
		);
	}
}
