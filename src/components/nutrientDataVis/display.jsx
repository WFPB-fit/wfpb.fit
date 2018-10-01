import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import LinkableSelect from "../LinkableSelect";

import {
	titleize,
	getRandomColor,
	getLink,
	alphaCompare,
	CenteredCircularProgress
} from "../../utils/GeneralUtils.jsx";

import RDA from "../../assets/data/preprocessed_data/RDA.json";
import NutrientNames from "../../assets/data/nutrientNames.js";
import NutrientGraph from "./nutrientGraph.jsx";
// import BestFoodSelector from './bestFood';
import NestedSelectField from "./nestedSelect/NestedSelectContainer.jsx";

import GraphNutrients from "../../assets/data/preprocessed_data/graphNutrients.json";

class Food extends Component {
	constructor(props) {
		super(props);

		//bind functions
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.addFood = this.addFood.bind(this);
		this.addFoods = this.addFoods.bind(this);
		this.getMacroPercentages = this.getMacroPercentages.bind(this);
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
		selectedFoods.push({ value: foodId, label: foodName });
		this.setState({ selectedFoods });
	}
	addFoods(foodIds) {
		let selectedFoods = Object.assign([], this.state.selectedFoods);
		for (const id of foodIds) {
			selectedFoods.push({ value: id, label: this.props.food.data[id].name });
		}
		this.setState({ selectedFoods });
	}

	static convertFoodsToSelectObjects(foods) {
		const optns = foods.map(x => {
			return { value: x.name, label: titleize(x.name) };
		});
		const alphaOptions = optns.sort(alphaCompare);
		return alphaOptions;
	}

	// https://academic.oup.com/ajcn/article/99/5/1223S/4577490
	static getRdaDensity(nutrients) {
		const numRdaNutrients = Object.values(RDA).length;
		let sum = 0;
		for (const nId in RDA) {
			const need = RDA[nId]
			const nutrientAmount = (nutrients[nId] || 0);
			const percentRDA = nutrientAmount / need;
			sum += Math.min(percentRDA, 1); //up to 100% of RDA, over that is not needed. Good idea?
			// sum += percentRDA;
			// debugger
		}
		//Normalize to 100kCal
		// sum *= 100 / nutrients[208]; //Already calorie-normalized in the offline data processing

		const percentTotalRDA = sum / numRdaNutrients
		return parseFloat((percentTotalRDA * 100).toFixed(1));
	}

	getNutrientName(nId) {
		return NutrientNames[nId];
	}
	getNutrientWeights(nutrientIds) {
		return foodId => {
			let foodData = this.props.food.data[foodId]; //each foodData is a line
			let dataPoints = [];
			for (const nId of nutrientIds) {
				//each nutrient is a point
				let val = 0;
				let isMissing = false;

				if (nId in foodData.n) val = foodData.n[nId];
				else isMissing = true;

				dataPoints.push({
					x: this.getNutrientName(nId),
					y: val,
					unit: "g",
					foodName: foodData.name,
					nutrientDataIsMissing: isMissing
				});
			}
			return dataPoints;
		};
	}

	getGraphData(getDataPointsFunction) {
		return this.state.selectedFoods.map(selectedFood => {
			const foodId = selectedFood.value;

			let foodData = Object.assign({}, this.props.food.data[foodId]); //each foodData is a line
			foodData.color = getRandomColor();
			foodData.id = foodId;
			foodData.dataPoints = getDataPointsFunction(foodId);

			return foodData;
		}, []);
	}

	getMacroPercentages(foodId) {
		const foodData = this.props.food.data[foodId];
		const proteinCal = foodData.n[203] * 4;
		const fatCal = foodData.n[204] * 9;
		const carbCal = (foodData.n[205] - (foodData.n[291] || 0)) * 4; //carb = 205, fiber=291. Fiber is a carb but it has no calories
		// const alcoholCal = foodData.n[221] * 7;
		const totalCal = foodData.n[208]; //cant add them all together - may not sum to 100% of calories 

		let dataPoints = [];

		//"203": "Protein",
		let percentCalFromProtein = 0;
		let isMissing = false;
		if (203 in foodData.n)
			percentCalFromProtein = (proteinCal / totalCal) * 100;
		else isMissing = true;
		dataPoints.push({
			x: this.getNutrientName(203),
			y: percentCalFromProtein,
			unit: "%",
			foodName: foodData.name,
			nutrientDataIsMissing: isMissing
		});

		//"204":"Fat", //Total Fat
		let percentCalFromFat = 0;
		isMissing = false;
		if (204 in foodData.n) percentCalFromFat = (fatCal / totalCal) * 100;
		else isMissing = true;
		dataPoints.push({
			x: this.getNutrientName(204),
			y: percentCalFromFat,
			unit: "%",
			foodName: foodData.name,
			nutrientDataIsMissing: isMissing
		});

		//"205": "Carbs",
		let percentCalFromCarbs = 0;
		isMissing = false;
		if (205 in foodData.n) percentCalFromCarbs = (carbCal / totalCal) * 100;
		else isMissing = true;
		dataPoints.push({
			x: this.getNutrientName(205),
			y: percentCalFromCarbs,
			unit: "%",
			foodName: foodData.name,
			nutrientDataIsMissing: isMissing
		});

		return dataPoints;
	}

	getCaloriesLineGraphData(foodId) {
		let foodsCalorieDataLine = this.state.selectedFoods.map(selectedFood => {
			const foodId = selectedFood.value;
			const foodData = this.props.food.data[foodId];
			const calories = foodData.n[208]; //calories nutrient ID
			return { x: foodData.name, y: calories, foodName: foodData.name };
		}, []);

		return [
			{
				dataPoints: foodsCalorieDataLine,
				id: 0
			}
		];
	}

	getRdaLineGraphData(foodId) {
		let foodsRdaDataLine = this.state.selectedFoods.map(selectedFood => {
			const foodId = selectedFood.value;
			const foodData = this.props.food.data[foodId];
			return { x: foodData.name, y: Food.getRdaDensity(foodData.n), unit: "%", foodName: foodData.name };
		}, []);

		return [
			{
				dataPoints: foodsRdaDataLine,
				id: 0
			}
		];
	}

	render() {
		if (Object.keys(this.props.food.data).length === 0 || Object.keys(this.props.food.indices).length === 0) {
			return (
				<CenteredCircularProgress size={50} />
			);
		}

		let dataVis = null;
		if (this.state.selectedFoods.length > 0) {
			//At least one food is selected
			//link to food sources
			const sources = this.state.selectedFoods.map(selectedFood => {
				const foodId = selectedFood.value;
				const foodData = this.props.food.data[foodId];
				const usdaFoodId = (foodId + "").padStart(5, '0');

				return (
					<li key={foodData.name}>
						{getLink(
							`https://ndb.nal.usda.gov/ndb/search/list?qlookup=${usdaFoodId}`,
							foodData.name
						)}
					</li>
				);
			}, []);

			const firstFoodId = this.state.selectedFoods[0].value;
			const firstfoodData = this.props.food.data[firstFoodId];

			let calories = `${firstfoodData.name}: ${firstfoodData.n[208]} Calories`;
			if (this.state.selectedFoods.length > 1) {
				calories = (
					<NutrientGraph
						linesData={this.getCaloriesLineGraphData()}
						yLabel="Calorie"
					/>
				);
			}

			let rdaDensity;
			if (this.state.selectedFoods.length > 1) {
				rdaDensity = (
					<NutrientGraph
						linesData={this.getRdaLineGraphData()}
						yLabel="RDA Density"
					/>
				);
			} else {
				rdaDensity = `${firstfoodData.name}: ${Food.getRdaDensity(firstfoodData.n)}%`;
			}

			dataVis = (
				<div>
					<p>Nutrients in 100 Grams of each food:</p>

					<div>
						<h2>RDA Density</h2>
						{rdaDensity}

						<h2>Calories</h2>
						{calories}

						<h2>Macronutrients</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["macros"])
							)}
						/>
						<h2>Macronutrient as a % of Calories</h2>
						<NutrientGraph
							linesData={this.getGraphData(this.getMacroPercentages)}
						/>
						<h2>Carbohydrates</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["carbs"])
							)}
						/>
						<h2>Fats</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["fats"])
							)}
						/>
						<p>
							SAFA = Saturated Fat, MUFA = Monounsaturated Fat, PUFA =
							Polyunsaturated Fat
						</p>

						<h2>Omega 3's</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["omega3"])
							)}
						/>
						<h2>Vitamins</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["vitamins"])
							)}
						/>
						{/* <h2>Synthetic Vitamins</h2>
					<NutrientGraph
						selectedFoods={selectedFoodsData}
						nutrientDataKey="fats"
					/> */}
						<h2>Minerals</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["minerals"])
							)}
						/>
						<h2>Amino Acids</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["amino"])
							)}
						/>
						<h2>Carotenoids</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["carotenoids"])
							)}
						/>
						<h2>Flavonoids</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["flavonoids"])
							)}
						/>
					</div>
					<h2>Sources</h2>
					<ul>{sources}</ul>
					<h2>Notes</h2>
					<ul>
						<li>
							"Missing data" indicates the USDA does not have data available on
							that nutrient
						</li>
						<li>
							Some displayed nutrients are actually summations of different
							nutrients, including:
						</li>
						<ul>
							<li>
								Vitamin E: Alpha, Beta, Gamma, Delta Tocopherol & Alpha, Beta,
								Gamma, Delta Tocotrienol
							</li>
							<li>
								Anthocyanidins: Cyanidin, Petunidin, Delphinidin, Malvidin,
								Pelargonidin, Peonidin{" "}
							</li>
							<li>
								Proanthocyanidin: Proanthocyanidin dimers, trimers, 4-6mers,
								7-10mers, polymers (>10mers){" "}
							</li>
							<li>
								Catechins: (+)-Catechin, (-)-Epigallocatechin, (-)-Epicatechin,
								(-)-Epicatechin 3-gallate, (-)-Epigallocatechin 3-gallate,
								(+)-Gallocatechin
							</li>
							<li>Flavonols: Isorhamnetin, Kaempferol, Myricetin, Quercetin</li>
							<li>
								Flavanones: Eriodictyol, Hesperetin, Naringenin, Apigenin,
								Luteolin
							</li>
							<li>
								Phytosterols: Misc Phytosterols, Stigmasterol, Campesterol,
								Beta-sitosterol
							</li>
						</ul>
					</ul>
				</div>
			);
		}

		return (
			<div>
				{/* <p>Enter a tag in the search bar to display info</p> */}
				<NestedSelectField
					selectedFoods={this.state.selectedFoods}
					addFood={this.addFood}
				/>
				<LinkableSelect
					placeholder="Food Text Search..."
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

export default withRouter(Food);
