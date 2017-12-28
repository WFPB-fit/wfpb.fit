import React, { Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select'

import { titleize, getRandomColor, getLink, alphaCompare } from '../../utils/GeneralUtils.jsx';

import NutrientNames from '../../assets/data/nutrientNames.js';
import NutrientGraph from './nutrientGraph.jsx';
import NestedSelectField from './nestedSelect/NestedSelectContainer.jsx';

import {
	ImportantNutrients
} from '../../assets/data/ImportantNutrients.js';

// var FoodData = null;
// var NutrientNames = null;

export default class Food extends Component {
	constructor(props) {
		super(props);

		//bind functions
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.addFood = this.addFood.bind(this);
		// this.getRelativeAminoAcids = this.getRelativeAminoAcids.bind(this);

		//init vars
		this.state = {
			selectedFoods: []
		};
	}
	handleSelectChange(value) {
		this.setState({ selectedFoods: value });
	}
	addFood(foodId, foodName) {
		let selectedFoods = Object.assign([], this.state.selectedFoods);
		selectedFoods.push({ value: foodId, label: foodName })
		this.setState({ selectedFoods });
	}

	static convertFoodsToSelectObjects(foods) {
		const optns = foods.map((x) => { return { value: x.name, label: titleize(x.name) } });
		const alphaOptions = optns.sort(alphaCompare);
		return alphaOptions;
	}

	//foods are set up to index by nutrient id instead of nutrient name.
	//index by name instead. Determine the color of lines to be used
	preprocessSelectedFoods() {
		// preprocess foods
		return this.state.selectedFoods.map(selectedFood => {
			const foodId = selectedFood.value;
			let foodData = Object.assign({}, this.props.foodData[foodId]);

			foodData.color = getRandomColor();
			foodData.id = foodId;

			//copy over nutrient amounts, substitute in real nutrient name for nutrient ID
			let newNutrients = {};
			// debugger

			for (const groupName of Object.keys(ImportantNutrients)) {
				let newGroupNutrients = [];
				for (const nId of ImportantNutrients[groupName]) {
					const nName = NutrientNames[nId];

					let val = 0;
					let isMissing = false;
					if (nId in foodData.n) val = foodData.n[nId];
					else isMissing = true;

					newGroupNutrients.push({ x: nName, y: val, nutrient_id: nId, foodName: foodData.name, nutrientDataIsMissing: isMissing });
				}
				newNutrients[groupName] = newGroupNutrients;
			}
			foodData.n = newNutrients;

			return foodData;
		}, []);
	}

	render() {
		const selectedFoodsData = this.preprocessSelectedFoods();

		let dataVis = null;
		if (selectedFoodsData.length > 0) { //At least one food is selected
			const graphs = (
				<div>
					<h2>Macronutrients</h2>
					<NutrientGraph
						selectedFoods={selectedFoodsData}
						nutrientDataKey="macros"
					/>
					<h2>Fats</h2>
					<NutrientGraph
						selectedFoods={selectedFoodsData}
						nutrientDataKey="fats"
					/>
					<p>SAFA = Saturated Fat, MUFA = Monounsaturated Fat, PUFA = Polyunsaturated Fat</p>

					<h2>Omega 3's</h2>
					<NutrientGraph
						selectedFoods={selectedFoodsData}
						nutrientDataKey="omega3"
					/>
					<h2>Vitamins</h2>
					<NutrientGraph
						selectedFoods={selectedFoodsData}
						nutrientDataKey="vitamins"
					/>
					{/* <h2>Synthetic Vitamins</h2>
					<NutrientGraph
						selectedFoods={selectedFoodsData}
						nutrientDataKey="fats"
					/> */}
					<h2>Minerals</h2>
					<NutrientGraph
						selectedFoods={selectedFoodsData}
						nutrientDataKey="minerals"
					/>
					<h2>Amino Acids</h2>
					<NutrientGraph
						selectedFoods={selectedFoodsData}
						nutrientDataKey="amino"
					/>
					<h2>Carotenoids</h2>
					<NutrientGraph
						selectedFoods={selectedFoodsData}
						nutrientDataKey="carotenoids"
					/>
					<h2>Flavonoids</h2>
					<NutrientGraph
						selectedFoods={selectedFoodsData}
						nutrientDataKey="flavonoids"
					/>
				</div>
			);

			//link to food sources
			const sources = (
				selectedFoodsData.map(food => {
					return (
						<li key={food.name}>
							{getLink(`https://ndb.nal.usda.gov/ndb/search/list?qlookup=${food.id}`, food.name)}
						</li>
					)
				})
			);
			const calories = (
				selectedFoodsData.map(food => {
					return (
						<li key={food.name}>
							{food.name}: {food.n.calories[0].y}
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
					selectedFoods={this.state.selectedFoods}
					addFood={this.addFood}
				/>
				<VirtualizedSelect
					name="form-field-name"
					value={this.state.selectedFoods}
					onChange={this.handleSelectChange}
					options={this.props.allSelectables}
					joinValues
					multi
				/>
				{dataVis}

			</div>
		);
	}
}
