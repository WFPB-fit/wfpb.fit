import React, { Component } from 'react';

import VirtualizedSelect from 'react-virtualized-select';

import { titleize, getRandomColor, getLink, alphaCompare } from '../../utils/GeneralUtils.jsx';

import NutrientNames from '../../assets/data/nutrientNames.js';
import NutrientGraph from './nutrientGraph.jsx';
// import BestFoodSelector from './bestFood';
import NestedSelectField from './nestedSelect/NestedSelectContainer.jsx';

import GraphNutrients from '../../assets/data/preprocessed_data/graphNutrients.json';

export default class Food extends Component {
	constructor(props) {
		super(props);

		//bind functions
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.addFood = this.addFood.bind(this);
		this.addFoods = this.addFoods.bind(this);
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
	addFoods(foodIds) {
		let selectedFoods = Object.assign([], this.state.selectedFoods);
		for (const id of foodIds) {
			selectedFoods.push({ value: id, label: this.props.food.data[id].name })
		}
		this.setState({ selectedFoods });
	}

	static convertFoodsToSelectObjects(foods) {
		const optns = foods.map((x) => { return { value: x.name, label: titleize(x.name) } });
		const alphaOptions = optns.sort(alphaCompare);
		return alphaOptions;
	}

	getTypicalFoodsLineGraphData(nutrientIds) {
		return this.state.selectedFoods.map(selectedFood => {
			const foodId = selectedFood.value;

			let foodData = Object.assign({}, this.props.food.data[foodId]); //each foodData is a line
			foodData.color = getRandomColor();
			foodData.id = foodId;

			//copy over nutrient amounts, substitute in real nutrient name for nutrient ID
			let newGroupNutrients = [];
			for (const nId of nutrientIds) { //each nutrient is a point
				const nName = NutrientNames[nId];

				let val = 0;
				let isMissing = false;
				if (nId in foodData.n) val = foodData.n[nId];
				else isMissing = true;

				newGroupNutrients.push({ x: nName, y: val, nutrient_id: nId, yLabel: 'g', foodName: foodData.name, nutrientDataIsMissing: isMissing });
			}
			foodData.dataPoints = newGroupNutrients;

			return foodData;
		}, []);
	}
	getCaloriesLineGraphData() {
		let foodsCalorieDataLine = this.state.selectedFoods.map(selectedFood => {
			const foodId = selectedFood.value;
			const foodData = this.props.food.data[foodId];
			const calories =  foodData.n[208]; //calories nutrient ID
			return { x: foodData.name, y: calories, foodName: foodData.name };
		}, []);

		return [{
			dataPoints: foodsCalorieDataLine
		}];
	}

	//foods are set up to index by nutrient id instead of nutrient name.
	//index by name instead. Determine the color of lines to be used
	preprocessSelectedFoods() {
		// preprocess foods
		return this.state.selectedFoods.map(selectedFood => {
			const foodId = selectedFood.value;
			let foodData = Object.assign({}, this.props.food.data[foodId]);

			foodData.color = getRandomColor();
			foodData.id = foodId;

			//copy over nutrient amounts, substitute in real nutrient name for nutrient ID
			let newNutrients = {};
			// debugger

			for (const groupName of Object.keys(GraphNutrients)) {
				let newGroupNutrients = [];
				for (const nId of GraphNutrients[groupName]) {
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
		let dataVis = null;
		if (this.state.selectedFoods.length > 0) { //At least one food is selected
			//link to food sources
			const sources = (
				this.state.selectedFoods.map(selectedFood => {
					const foodId = selectedFood.value;
					const foodData = this.props.food.data[foodId];
					return (
						<li key={foodData.name}>
							{getLink(`https://ndb.nal.usda.gov/ndb/search/list?qlookup=${foodData.id}`, foodData.name)}
						</li>
					)
				}, [])
			);

			const firstFoodId = this.state.selectedFoods[0].value;
			const firstfoodData = this.props.food.data[firstFoodId];
			console.log(firstfoodData)
			let calories = `${firstfoodData.name}: ${firstfoodData.n[208]} Calories`
			if (this.state.selectedFoods.length > 1) {
				calories = (
					<NutrientGraph
						linesData={this.getCaloriesLineGraphData()}
					/>
				);
			}

			dataVis = (
				<div>
					<p>Nutrients in 100 Grams of each food:</p>

					<div>
						<h2>Calories</h2>
						{calories}
						<h2>Macronutrients</h2>
						<NutrientGraph
							linesData={this.getTypicalFoodsLineGraphData(GraphNutrients["macros"])}
						/>
						<h2>Carbohydrates</h2>
						<NutrientGraph
							linesData={this.getTypicalFoodsLineGraphData(GraphNutrients["carbs"])}
						/>
						<h2>Fats</h2>
						<NutrientGraph
							linesData={this.getTypicalFoodsLineGraphData(GraphNutrients["fats"])}
						/>
						<p>SAFA = Saturated Fat, MUFA = Monounsaturated Fat, PUFA = Polyunsaturated Fat</p>

						<h2>Omega 3's</h2>
						<NutrientGraph
							linesData={this.getTypicalFoodsLineGraphData(GraphNutrients["omega3"])}
						/>
						<h2>Vitamins</h2>
						<NutrientGraph
							linesData={this.getTypicalFoodsLineGraphData(GraphNutrients["vitamins"])}
						/>
						{/* <h2>Synthetic Vitamins</h2>
					<NutrientGraph
						selectedFoods={selectedFoodsData}
						nutrientDataKey="fats"
					/> */}
						<h2>Minerals</h2>
						<NutrientGraph
							linesData={this.getTypicalFoodsLineGraphData(GraphNutrients["minerals"])}
						/>
						<h2>Amino Acids</h2>
						<NutrientGraph
							linesData={this.getTypicalFoodsLineGraphData(GraphNutrients["amino"])}
						/>
						<h2>Carotenoids</h2>
						<NutrientGraph
							linesData={this.getTypicalFoodsLineGraphData(GraphNutrients["carotenoids"])}
						/>
						<h2>Flavonoids</h2>
						<NutrientGraph
							linesData={this.getTypicalFoodsLineGraphData(GraphNutrients["flavonoids"])}
						/>
					</div>
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
					filterOptions={this.props.food.filterOptions}
					value={this.state.selectedFoods}
					onChange={this.handleSelectChange}
					options={this.props.food.allSelectables}
					joinValues
					multi
				/>
				{/* <BestFoodSelector
					foodData={this.props.food.data}
					addFoods={this.addFoods}
				/> */}
				{dataVis}

			</div>
		);
	}
}
