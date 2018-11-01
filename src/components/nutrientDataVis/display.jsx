import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import LinkableSelect from "../LinkableSelect";

import {
	titleize,
	getLink,
	alphaCompare,
	CenteredCircularProgress
} from "../../utils/GeneralUtils.jsx";

import Help from "../help";
import DRI from "../../assets/data/preprocessed_data/DRI.json";
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
		const numRdaNutrients = Object.values(DRI).length;
		let sum = 0;
		for (const nId in DRI) {
			const need = DRI[nId];
			const nutrientAmount = nutrients[nId] || 0;
			const percentDRI = nutrientAmount / need;
			sum += Math.min(percentDRI, 1); //up to 100% of DRI, over that is not needed. Good idea?
			// sum += percentDRI;
			// debugger
		}
		//Normalize to 100kCal
		// sum *= 100 / nutrients[208]; //Already calorie-normalized in the offline data processing

		const percentTotalDRI = sum / numRdaNutrients;
		return parseFloat((percentTotalDRI * 100).toFixed(1));
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
			foodData.color = this.props.food.foodColors[foodId];
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
		const totalCal = 100; // food normalized to be 100kcal  //foodData.n[208]; //cant add them all together - may not sum to 100% of calories
		console.log(totalCal, proteinCal, fatCal, carbCal, foodData.n);
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
			return {
				x: foodData.name,
				y: Food.getRdaDensity(foodData.n),
				unit: "%",
				foodName: foodData.name
			};
		}, []);

		return [
			{
				dataPoints: foodsRdaDataLine,
				id: 0
			}
		];
	}

	render() {
		if (
			Object.keys(this.props.food.data).length === 0 ||
			Object.keys(this.props.food.foodColors).length === 0
		) {
			return <CenteredCircularProgress size={50} />;
		}

		let dataVis = null;
		if (this.state.selectedFoods.length > 0) {
			//At least one food is selected
			//link to food sources
			const sources = this.state.selectedFoods.map(selectedFood => {
				const foodId = selectedFood.value;
				const foodData = this.props.food.data[foodId];
				const usdaFoodId = (foodId + "").padStart(5, "0");

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

			let driDensity;
			if (this.state.selectedFoods.length > 1) {
				driDensity = (
					<NutrientGraph
						linesData={this.getRdaLineGraphData()}
						yLabel="DRI Density"
					/>
				);
			} else {
				driDensity = `${firstfoodData.name}: ${Food.getRdaDensity(
					firstfoodData.n
				)}%`;
			}

			dataVis = (
				<div>
					<div>
						<h2>
							DRI Density
							<Help
								title="DRI Density"
								content={
									<div>
										<Typography>Higher is better</Typography>
										<Typography>
											DRI density for each food is calculated by
										</Typography>
										<ol>
											<li>
												Get human nutrient requirements, also known as Dietary
												Reference Intakes (DRI), from the{" "}
												{getLink(
													"http://nationalacademies.org/HMD/Activities/Nutrition/SummaryDRIs/DRI-Tables.aspx",
													"National Academies of Sciences."
												)}
											</li>
											<li>
												For each food, normalize its nutrients to 100 Calories.
												That means we use the USDA's data, given in terms of 100
												grams of food, to calculate how much of each nutrient
												would be in 100 Calories of food.
											</li>
											<li>
												For every nutrient, its normalized value is divided by
												its DRI value. The result is the percent 100 Calories of
												food fulfills of DRI nutrient requirements.
											</li>
											<li>
												Sum up all these nutrient percentages to get percent of
												total DRI fulfillment from 100 Calories of food, or DRI
												density for short.
											</li>
										</ol>
										<Typography>
											Unfortunately, the value shown here is not exact. Some
											nutrients have a DRI but the USDA source data does not
											have information on how much of it is in our food. Those
											nutrients are:
										</Typography>
										<ul>
											<li>Biotin</li>
											<li>Chromium</li>
											<li>Iodine</li>
											<li>Molybdenum</li>
											<li>Linoleic Acid</li>
										</ul>
									</div>
								}
							/>
						</h2>
						{driDensity}

						<h2>Calories (per 100g)</h2>
						{calories}


						<h2>Macronutrients (per 100Cal)</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["macros"])
							)}
						/>
						{/* <h2>Macronutrient as a % of Calories</h2>
						<NutrientGraph
							linesData={this.getGraphData(this.getMacroPercentages)}
						/> */}
						<h2>Carbohydrates (per 100Cal)</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["carbs"])
							)}
						/>
						<h2>Fats (per 100Cal)</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["fats"])
							)}
						/>
						<p>
							SAFA = Saturated Fat, MUFA = Monounsaturated Fat, PUFA =
							Polyunsaturated Fat
						</p>

						<h2>Omega 3's (per 100Cal)</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["omega3"])
							)}
						/>
						<h2>Vitamins (per 100Cal)</h2>
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
						<h2>Minerals (per 100Cal)</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["minerals"])
							)}
						/>
						<h2>Amino Acids (per 100Cal)</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["amino"])
							)}
						/>
						<h2>Carotenoids (per 100Cal)</h2>
						<NutrientGraph
							linesData={this.getGraphData(
								this.getNutrientWeights(GraphNutrients["carotenoids"])
							)}
						/>
						<h2>Flavonoids (per 100Cal)</h2>
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
								Vitamin E: Alpha Tocotrienol and Added Vitmin E
							</li>
							<li>
								Vitamin B12: Vitamin B12 and Added Vitamin B12
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
				<Typography variant="h4">Compare Food Nutrition</Typography>
				<NestedSelectField
					selectedFoods={this.state.selectedFoods}
					addFood={this.addFood}
				/>
				<LinkableSelect
					placeholder="Food Name Search..."
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
