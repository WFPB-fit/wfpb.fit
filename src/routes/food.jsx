import React, { Component } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
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
	static getCarbohydrateVal(food) { return food.nutrients.energy.carbs; }
	static getProteinVal(food) { return food.nutrients.energy.protein; }
	static getFatVal(food) { return food.nutrients.energy.fat; }

	static convertFoodsToSelectObjects(foods) {
		const optns = foods.map((x) => { return { value: x.name, label: titleize(x.name) } });
		const alphaOptions = optns.sort((a, b) => a.value.localeCompare(b.value)); //alphabetize it
		return alphaOptions;
	}

	getEnergyBreakdownChart(){
		const energy = [
			this.getSelectedFoodNutrientRechartData('Carbohydrates', Food.getCarbohydrateVal),
			this.getSelectedFoodNutrientRechartData('Fat', Food.getFatVal),
			this.getSelectedFoodNutrientRechartData('Protein', Food.getProteinVal)
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
				{this.getEnergyBreakdownChart()}
			</div>
		);
	}
}
