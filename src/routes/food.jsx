import React, { Component } from 'react';
import {
	Legend, Tooltip, XAxis, YAxis, ZAxis, CartesianGrid,
	RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
	LineChart, Scatter, ScatterChart
} from 'recharts';
import { titleize, getRandomColor } from '../utils/GeneralUtils.jsx';
import FullNutritionInfo from '../assets/data/nutrition/fullNutritionInfo.json';
// import exampleFDAdata from '../assets/data/nutrition/exampleFDA.json';
// console.log(exampleFDAdata)
import Select from 'react-select';
import 'react-select/dist/react-select.css';

// import FdaApi from '../utils/FdaApi.js';
// FdaApi.getFullNutritionInfo();
console.log(FullNutritionInfo)

export default class Food extends Component {
	static foodToCarb(food) { return food.nutrients.energy.carbs; }
	static foodToProtein(food) { return food.nutrients.energy.protein; }
	static foodToFat(food) { return food.nutrients.energy.fat; }
	static mapObjToXY(obj) {
		return Object.keys(obj).map(function (key, index) {
			return { x: key, y: obj[key] };
		});
	}

	static convertFoodsToSelectObjects(foods) {
		const optns = foods.map((x) => { return { value: x.name, label: titleize(x.name) } });
		const alphaOptions = optns.sort((a, b) => a.value.localeCompare(b.value)); //alphabetize it
		return alphaOptions;
	}

	getEnergyBreakdownScatterChart() {
		// const energyFoodData = this.state.selectedFoods.map((selectedFood) => {
		// 	// const f = { name: selectedFood.label };
		// 	// const food = this.indexedFoods[selectedFood.value];
		// 	// return Object.assign(f, food.nutrients.energy);
		// 	const food = this.indexedFoods[selectedFood.value];
		// 	return { name: selectedFood.label, data: Food.mapObjToXY(food.nutrients.energy) };
		// });
		const scatters = this.state.selectedFoods.map((selectedFood) => {
			let food = this.indexedFoods[selectedFood.value];
			let data = Food.mapObjToXY(food.nutrients.energy);
			return (
				<Scatter
					key={selectedFood.label}
					name={selectedFood.label}
					data={data}
					fill={getRandomColor()}
					line
					shape="cross" />
			);
		});
		return (
			<ScatterChart width={600} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
				<XAxis  dataKey='x' name='Macro' />
				<YAxis type="number" dataKey={'y'} name='Grams' unit='g' />
				<CartesianGrid />
				<Tooltip cursor={{ strokeDasharray: '3 3' }} />
				<Legend />
				{scatters}
			</ScatterChart >
		);
	}
	getEnergyBreakdownRadialChart() {
		const energy = [
			this.getSelectedFoodNutrientRechartData('Carbohydrates', Food.foodToCarb),
			this.getSelectedFoodNutrientRechartData('Fat', Food.foodToFat),
			this.getSelectedFoodNutrientRechartData('Protein', Food.foodToProtein)
		];
		const radars = this.state.selectedFoods.map((selectedFood) => {
			const color = getRandomColor();
			return (
				<Radar
					name={selectedFood.label}
					key={selectedFood.value}
					dataKey={selectedFood.value}
					stroke={color}
					fill={color}
					fillOpacity={0.2}
				/>
			)
		});
		return (
			<RadarChart outerRadius={90} width={730} height={250} data={energy} >
				<PolarGrid />
				<PolarAngleAxis dataKey="subject" />
				<PolarRadiusAxis />
				{radars}
				<Legend />
			</RadarChart >
		);
	}

	constructor(props) {
		super(props);
		//bind functions
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.getSelectedFoodNutrientRechartData = this.getSelectedFoodNutrientRechartData.bind(this);

		//init vars
		this.allSelectableFoods = Food.convertFoodsToSelectObjects(FullNutritionInfo)
		this.indexedFoods = FullNutritionInfo.reduce((map, obj) => {
			map[obj.name] = obj;
			return map;
		}, {});
		this.state = {
			selectedFoods: [this.allSelectableFoods[0]]
		}
	}
	handleSelectChange(value) {
		this.setState({ selectedFoods: value });
	}
	getSelectedFoodNutrientRechartData(nutrientSubjectName, getNutrientValue) {
		const nutrients = this.state.selectedFoods.reduce((map, selectedFood) => {
			const food = this.indexedFoods[selectedFood.value];
			map[selectedFood.value] = getNutrientValue(food);
			return map;
		}, {});
		nutrients.subject = nutrientSubjectName;
		return nutrients;
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
				{this.getEnergyBreakdownScatterChart()}
			</div>
		);
	}
}
