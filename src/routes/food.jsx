import React, { Component } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { titleize } from '../utils/GeneralUtils.jsx';
import FullNutritionInfo from '../assets/data/nutrition/fullNutritionInfo.json';
// import exampleFDAdata from '../assets/data/nutrition/exampleFDA.json';
// console.log(exampleFDAdata)
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import FdaApi from '../utils/FdaApi.js';
FdaApi.getFullNutritionInfo();
console.log(FullNutritionInfo)

export default class Food extends Component {
	static convertFoodsToSelectObjects(foods) {
		const optns = foods.map((x) => { return { value: x.name, label: titleize(x.name) } });
		const alphaOptions = optns.sort((a, b) => a.value.localeCompare(b.value)); //alphabetize it
		return alphaOptions;
	}

	constructor(props) {
		super(props);
		//bind functions
		this.handleSelectChange = this.handleSelectChange.bind(this);

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
	render() {
		const getName = (x) => { return titleize(x.name); }
		const graphs = this.state.selectedFoods.map((selectedFood) => {
			const foodData = this.indexedFoods[selectedFood.value];
			console.log(foodData)
			return (
				<div key={selectedFood.value} >
					<RadarChart outerRadius={90} width={730} height={250} data={foodData.nutrients.energy} >
						<PolarGrid />
						<PolarAngleAxis dataKey={getName} />
						<PolarRadiusAxis angle={30} />
						<Radar name={selectedFood.label} dataKey="valPer100g" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
						<Legend />
					</RadarChart >
				</div>
			);
		});

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
				{graphs}
			</div>
		);
	}
}
