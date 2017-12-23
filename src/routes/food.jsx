import React, { Component } from 'react';

import { titleize, getRandomColor } from '../utils/GeneralUtils.jsx';
import VirtualizedSelect from 'react-virtualized-select'
import { getLink, alphaCompare } from '../utils/GeneralUtils.jsx';

import FoodData from '../assets/data/nutrition/foodData.json';
import IndexedFoodSearch from '../assets/data/nutrition/indexedFoods.json';
import { ImportantNutrients } from '../assets/data/importantNutrients.js';
import NutrientNames from '../assets/data/nutrientNames.json';
import NutrientGraph from '../components/nutrientGraph.jsx';
import NestedSelectField from '../components/NestedSelectField.jsx';

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
			window.globalAppData.foodData = Object.keys(FoodData).reduce((total, foodId) => {
				let foodData = FoodData[foodId];
				foodData.color = getRandomColor();
				foodData.id = foodId;

				//copy over nutrient amounts, substitute in real nutrient name for nutrient ID
				for (const nGroupName of Object.keys(ImportantNutrients)) {
					let nutrients = ImportantNutrients[nGroupName];

					//reindex by nutrient name instead of ID
					let chartNutrientData = nutrients.reduce((total, nId) => {
						const nName = NutrientNames[nId];

						let val = 0;
						let isMissing = false;
						if (nId in foodData.nutrients[nGroupName]) val = foodData.nutrients[nGroupName][nId];
						else {
							// if (foodId === "01001") console.log(foodData.nutrients[nGroupName],nId)
							isMissing = true;
						}
						total.push({ x: nName, y: val, nutrient_id: nId, foodName: foodData.name, nutrientDataIsMissing: isMissing });
						return total;
					}, []);
					foodData.nutrients[nGroupName] = chartNutrientData;
				}

				//add the preprocessed foods to the returned object
				total[foodId] = foodData;
				return total;
			}, {});
		}



		//init vars
		this.allSelectables = Object.keys(window.globalAppData.foodData)
			.map(id => {
				return { value: id, label: window.globalAppData.foodData[id].name };
			})
			.sort(alphaCompare);
		this.state = {
			selectedFoods: [this.allSelectables[0]],
			selectedFoodFilters: [],
		};
	}
	handleSelectChange(value) {
		this.setState({ selectedFoods: value });
	}
	static convertFoodsToSelectObjects(foods) {
		const optns = foods.map((x) => { return { value: x.name, label: titleize(x.name) } });
		const alphaOptions = optns.sort(alphaCompare);
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
				<h2>Overview</h2>
				<NutrientGraph
					selectedFoods={selectedFoods}
					nutrientDataKey="overview"
				/>
				<h2>Fats</h2>
				<NutrientGraph
					selectedFoods={selectedFoods}
					nutrientDataKey="fats"
				/>
				<p>SAFA = Saturated Fat, MUFA = Monounsaturated Fat, PUFA = Polyunsaturated Fat</p>
				<h2>Vitamins</h2>
				<NutrientGraph
					selectedFoods={selectedFoods}
					nutrientDataKey="vitamins"
				/>
				<h2>Minerals</h2>
				<NutrientGraph
					selectedFoods={selectedFoods}
					nutrientDataKey="minerals"
				/>
				<h2>Amino Acids</h2>
				<NutrientGraph
					selectedFoods={selectedFoods}
					nutrientDataKey="amino"
				/>
				<h2>Carotenoids</h2>
				<NutrientGraph
					selectedFoods={selectedFoods}
					nutrientDataKey="carotenoids"
				/>
				<h2>Flavonoids</h2>
				<NutrientGraph
					selectedFoods={selectedFoods}
					nutrientDataKey="flavonoids"
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
			const calories = (
				selectedFoods.map(food => {
					return (
						<li key={food.name}>
							{food.name}: {food.nutrients.calories[0].y}
						</li>
					)
				})
			);

			dataVis = (
				<div>
					<p>Nutrients in 100 Grams of each food:</p>
					<h2>Calories</h2>
					<ul>
						{calories}
					</ul>
					{graphs}
					<h2>Sources</h2>
					<ul>
						{sources}
					</ul>
					<h2>Notes</h2>
					<ul>
						<li>"Missing data" indicates the USDA does not have data available on that nutrient</li>
						<li>Some displayed nutrients are actually summations of different nutrients, including:</li>
						<ul>
							<li>Vitamin E: Alpha, Beta, Gamma, Delta Tocopherol & Alpha, Beta, Gamma, Delta Tocotrienol</li>
							<li>Anthocyanidins: Cyanidin, Petunidin, Delphinidin, Malvidin, Pelargonidin, Peonidin </li>
							<li>Proanthocyanidin: Proanthocyanidin dimers, trimers, 4-6mers, 7-10mers, polymers (>10mers) </li>
							<li>Catechins: (+)-Catechin, (-)-Epigallocatechin, (-)-Epicatechin, (-)-Epicatechin 3-gallate, (-)-Epigallocatechin 3-gallate, (+)-Gallocatechin</li>
							<li>Flavonols: Isorhamnetin, Kaempferol, Myricetin, Quercetin</li>
							<li>Flavanones: Eriodictyol, Hesperetin, Naringenin, Apigenin, Luteolin</li>
							<li>Phytosterols: Misc Phytosterols, Stigmasterol, Campesterol, Beta-sitosterol</li>
						</ul>
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
				<NestedSelectField
					selectObject={IndexedFoodSearch}
					selectedKeys={this.state.selectedFoodFilters}
				/>
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
