import React, { Component } from 'react';

import { titleize, getRandomColor } from '../utils/GeneralUtils.jsx';
import FullNutritionInfo from '../assets/data/nutrition/fullNutritionInfo.json';
// import exampleFDAdata from '../assets/data/nutrition/exampleFDA.json';
// console.log(exampleFDAdata)
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {
	VictoryGroup, VictoryChart, VictoryAxis, VictoryLegend,VictoryLabel,
	VictoryTheme, VictoryTooltip, VictoryScatter, VictoryLine, VictoryVoronoiContainer
} from 'victory';

// import FdaApi from '../utils/FdaApi.js';
// FdaApi.getFullNutritionInfo();
console.log(FullNutritionInfo)

export default class Food extends Component {
	constructor(props) {
		super(props);
		//bind functions
		this.getVictoryData = this.getVictoryData.bind(this);
		this.selectedFoodsToFoodData = this.selectedFoodsToFoodData.bind(this);
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
	selectedFoodsToFoodData() {
		return this.state.selectedFoods.map(selectedFood => {
			return this.indexedFoods[selectedFood.value];
		}, []);
	}

	createVictoryLineChart(w = 200, h = 200, title = "Food") {
		const selectedFoods = this.selectedFoodsToFoodData();
		const selectDataColor = function (d, active) { console.log(d); return d.color; };
		const axisStyle = {
			ticks: { stroke: "grey", size: 5 },
			tickLabels: { fontSize: 5 },
		};

		const lines = selectedFoods.map(food => {
			return (
				<VictoryLine
					data={this.getVictoryData(food.nutrients.energy, food.name, food.color)}
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
					x={w/2} y={10}
					text={title}
				/>
				<VictoryAxis independentAxis
					style={axisStyle} />
				<VictoryAxis dependentAxis
					style={axisStyle} />
				<VictoryLegend x={5} y={h - 10}
					orientation="horizontal"
					gutter={5}
					style={{
						labels: { fontSize: 5 },
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
				{this.createVictoryLineChart()}
			</div>
		);
	}
}
