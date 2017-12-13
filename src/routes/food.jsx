import React, { Component } from 'react';

import { titleize, getRandomColor } from '../utils/GeneralUtils.jsx';
import VirtualizedSelect from 'react-virtualized-select'
import { getLink } from '../utils/GeneralUtils.jsx';

import FoodData from '../assets/data/nutrition/foodData.json';
import NutrientNames from '../assets/data/nutrientNames.json';
import NutrientGraph from '../components/nutrientGraph.jsx';

// var FoodData = null;
// var NutrientNames = null;

export default class Food extends Component {
	constructor(props) {
		super(props);
		//bind functions
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

	//foods are set up to index by nutrient id instead of nutrient name.
	//index by name instead. Determine the color of lines to be used
	preprocessSelectedFoods() {
		return this.state.selectedFoods.map(selectedFood => {
			let food = window.globalAppData.foodData[selectedFood.value];
			return food;
		}, []);
	}

	render() {
		const selectedFoods = this.preprocessSelectedFoods();
		console.log(selectedFoods)
		let dataVis = null;
		if (selectedFoods.length > 0) { //At least one food is selected
			const graphs = (<div>
				<NutrientGraph
					selectedFoods={selectedFoods}
					title="Overview"
					nutrientDataKey="overview"
				/>
				<NutrientGraph
					selectedFoods={selectedFoods}
					title="Fats"
					nutrientDataKey="fats"
				/>
				<p>SAFA = Saturated Fat, MUFA = Monounsaturated Fat, PUFA = Polyunsaturated Fat</p>
				<NutrientGraph
					selectedFoods={selectedFoods}
					title="Vitamins"
					nutrientDataKey="vitamins"
				/>
				<NutrientGraph
					selectedFoods={selectedFoods}
					title="Minerals"
					nutrientDataKey="minerals"
				/>
				<NutrientGraph
					selectedFoods={selectedFoods}
					title="Amino Acids"
					nutrientDataKey="amino"
				/>
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
