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

// import FdaApi from '../utils/FdaApi.js';
// FdaApi.getFullNutritionInfo();
console.log(FullNutritionInfo)

export default class Food extends Component {
	static getFoodNutrients(food, nutrientKey) {
		console.log(food, nutrientKey);return food.nutrients[nutrientKey]; }

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

	createVictoryLineChart(getNutrients, title, nutrientDataKey, w = 200, h = 200) {
		const selectedFoods = this.state.selectedFoods.map(selectedFood => {
			return this.indexedFoods[selectedFood.value];
		}, []);

		const selectDataColor = function (d, active) { return d.color; };
		const axisStyle = {
			ticks: { stroke: "grey", size: 3 },
			tickLabels: { fontSize: 5, padding: 1},
		};
		let xAxisStyle = Object.assign({},axisStyle);
		xAxisStyle.tickLabels.textAnchor = 'start';
		xAxisStyle.tickLabels.angle = 45;

		const lines = selectedFoods.map(food => {
			console.log(food)
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
				padding={{bottom:50,left:30,right:20,top:10}}
				containerComponent={
					//setup tool tip
					<VictoryVoronoiContainer
						dimension="x"
						labels={(d) => `${d.name}: \n${d.x}: ${d.y}`}
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
				{this.createVictoryLineChart(Food.getFoodNutrients, "Energy", 'energy')}
				{this.createVictoryLineChart(Food.getFoodNutrients, "Micronutrients", 'misc')}
				{this.createVictoryLineChart(Food.getFoodNutrients, "Vitamins", 'vitamins')}
				{this.createVictoryLineChart(Food.getFoodNutrients, "Minerals", 'minerals')}
				{this.createVictoryLineChart(Food.getFoodNutrients, "Amino Acids", 'amino')}
				</div>
		);
	}
}
