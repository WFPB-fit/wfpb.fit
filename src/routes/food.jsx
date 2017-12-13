import React, { Component } from 'react';

import { titleize, getRandomColor } from '../utils/GeneralUtils.jsx';
import VirtualizedSelect from 'react-virtualized-select'
import {
	VictoryChart, VictoryAxis, VictoryLegend, VictoryLabel,
	VictoryTooltip, VictoryLine, createContainer
} from 'victory';
import { getLink } from '../utils/GeneralUtils.jsx';

import FoodData from '../assets/data/nutrition/foodData.json';
import NutrientNames from '../assets/data/nutrientNames.json';

// var FoodData = null;
// var NutrientNames = null;

export default class Food extends Component {
	static getFoodNutrients(food, nutrientKey) { return food.nutrients[nutrientKey]; }

	constructor(props) {
		super(props);
		//bind functions
		this.getVictoryData = this.getVictoryData.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		// this.getRelativeAminoAcids = this.getRelativeAminoAcids.bind(this);

		// preprocess foods
		if (!window.globalAppData.foodData) {
			window.globalAppData.foodData = Object.keys(FoodData).reduce((total, foodName) => {
				let foodData = FoodData[foodName];
				foodData.color = getRandomColor();

				//copy over nutrient amounts, substitute in real nutrient name for nutrient ID
				for (const nGroupName of Object.keys(foodData.nutrients)) {
					let nutrients = foodData.nutrients[nGroupName];
					//reindex by nutrient name instead of ID
					let renamedNutrients = Object.keys(nutrients).reduce((total, nId) => {
						const nName = NutrientNames[nId];
						total[nName] = nutrients[nId];
						return total;
					}, {});
					foodData.nutrients[nGroupName] = renamedNutrients;
				}

				//add the preprocessed foods to the returned object
				total[foodName] = foodData;
				return total;
			}, {});
		}



		//init vars
		this.allSelectables = Object.keys(window.globalAppData.foodData)
			.map(id => {
				return { value: id, label: window.globalAppData.foodData[id].name };
			})
			.sort((a, b) => { return a.label.localeCompare(b.label); });
		this.state = {
			selectedFoods: [this.allSelectables[0]]
		};
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
		let val = Number(d.y);
		let unit = d.yLabel;

		if (!unit) {
			if (d.y < 1e-3) { val *= 1e6; unit = 'MicroGrams'; }
			else if (d.y < 1) { val *= 1e3; unit = 'MilliGrams'; }
			else { unit = 'Grams'; }
		}
		return `${d.name}: \n${d.x}: ${val.toFixed(1)} ${unit}`
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
				padding={{ bottom: 50, left: 20, right: 20, top: 10 }}
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

	//foods are set up to index by nutrient id instead of nutrient name.
	//index by name instead. Determine the color of lines to be used
	preprocessSelectedFoods() {
		return this.state.selectedFoods.map(selectedFood => {
			let food = window.globalAppData.foodData[selectedFood.value];
			// food.nutrients.relativeAmino = this.getRelativeAminoAcids(food);
			return food;
		}, []);
	}

	// getRelativeAminoAcids(food) {
	// 	let relAmino = {};
	// 	const totalAmino = Object.values(food.nutrients.amino).reduce((a, b) => { return a + b }, 0);

	// 	if (totalAmino > 0) {
	// 		for (const key of Object.keys(food.nutrients.amino)) {
	// 			relAmino[key] = food.nutrients.amino[key] / totalAmino;
	// 			relAmino[key] *= 100; //in %
	// 		}
	// 	}
		
	// 	return relAmino;
	// }

	render() {
		const selectedFoods = this.preprocessSelectedFoods();
		console.log(selectedFoods)
		let dataVis = null;
		if (selectedFoods.length > 0) { //At least one food is selected
			const graphs = (<div>
				{this.createVictoryLineChart(selectedFoods, Food.getFoodNutrients, "Overview", 'overview')}
				{this.createVictoryLineChart(selectedFoods, Food.getFoodNutrients, "Fats", 'fats')}
				<p>SAFA = Saturated Fat, MUFA = Monounsaturated Fat, PUFA = Polyunsaturated Fat</p>
				{this.createVictoryLineChart(selectedFoods, Food.getFoodNutrients, "Vitamins", 'vitamins')}
				{this.createVictoryLineChart(selectedFoods, Food.getFoodNutrients, "Minerals", 'minerals')}
				{this.createVictoryLineChart(selectedFoods, Food.getFoodNutrients, "Amino Acids", 'amino')}
				{/* {this.createVictoryLineChart(selectedFoods, Food.getFoodNutrients, "Relative Amino Acids", 'relativeAmino')} */}
				{/* {this.createVictoryLineChart(selectedFoods, Food.getFoodNutrients, "Phytosterols", 'phytosterols')} */}

			</div>);

			//link to food sources
			const sources = (
				selectedFoods.map(food => {
					return (
						<li key={food.name}>
							{getLink(`https://ndb.nal.usda.gov/ndb/search/list?qlookup=${food.id}`, food.name)}
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
		} else { //no foods are selected
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
