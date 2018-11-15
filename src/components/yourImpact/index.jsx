import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

import styled from "styled-components";

import CalorieEstimator from "./calorieEstimator/index.jsx";
import FoodEstimator from "../foodEstimator";
import DataVis from "./viz/index.jsx";
import Help from "../help";
// import WRI from "../../assets/data/environment/wri.js";
import ReferenceFoodUsage from "../../assets/data/environment/ReferenceFoodUsage.js";
import { sumValues, getLink } from "../../utils/GeneralUtils.jsx";

const Wrapper = styled.div`
	img {
		display: block;
		margin: 0 auto;
	}
`;

export default class YourImpact extends Component {
	handleFoodWasteChange = (event, value) => {
		this.setState({ foodWastePercent: value });
	};

	constructor(props) {
		super(props);

		this.toggleOverallVisible = this.toggleOverallVisible.bind(this);
		this.handleDietCompositionChange = this.handleDietCompositionChange.bind(
			this
		);
		this.handleDailyCaloriesChange = this.handleDailyCaloriesChange.bind(this);

		this.state = {
			overallVisible: false,
			dailyCalories: 0,
			foodWastePercent: 25,
			dietComposition: Object.assign({}, ReferenceFoodUsage[2].data)
		};

		//set default food usages to some random vegan amounts. Can try to find better data-backed defaults later
		//this.state.dietComposition = {}
		// Object.keys(WRI["land"]).forEach(x => { //set everythin default to 0
		// 	this.state.dietComposition[x] = 0;
		// });
		// this.state.dietComposition.Wheat = 5;
		// this.state.dietComposition.Rice = 5;
		// this.state.dietComposition.Maize = 5;
		// this.state.dietComposition["Roots and tubers"] = 5;
		// this.state.dietComposition["Fruits and vegetables"] = 45;
		// this.state.dietComposition.Nuts = 10;
		// this.state.dietComposition.Pulses = 25;
	}

	toggleOverallVisible() {
		this.setState({ overallVisible: !this.state.overallVisible });
	}

	handleDietCompositionChange(key) {
		return event => {
			let newState = Object.assign({}, this.state.dietComposition);
			newState[key] = event.target.value;
			this.setState({ dietComposition: newState });
		};
	}
	handleDailyCaloriesChange(cal) {
		this.setState({ dailyCalories: cal });
	}

	render() {
		let viz = null;
		if (sumValues(this.state.dietComposition) === 100) {
			viz = (
				<DataVis
					foodWastePercent={this.state.foodWastePercent}
					foodUsage={this.state.dietComposition}
					refFoodUsages={ReferenceFoodUsage}
					dailyCalories={this.state.dailyCalories}
				/>
			);
		}

		return (
			<Wrapper>
				{/* <Typography>
					View your diet's impact on water use, land use, and Greenhouse Gas creation.
				</Typography> */}

				<h2>
					Calorie Estimator
					<Help
						title="Calorie Estimator"
						content={
							<div>
								<Typography>
									We use the{" "}
									{getLink(
										"https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation",
										"Harris–Benedict equation"
									)}{" "}
									for estimating daily calories. That value is multiplied by
									365.25 to get your yearly calories.
								</Typography>
							</div>
						}
					/>
				</h2>
				<CalorieEstimator
					handleDailyCaloriesChange={this.handleDailyCaloriesChange}
				/>

				<h2>
					Food Waste{" "}
					<Help
						title="Food Waste"
						content={
							<div>
								<Typography>
									Not all food we buy is eaten, but it still makes an
									environmental impact. On average Americans waste over 20% of
									their food, according to the USDA's report{" "}
									{getLink(
										"https://www.ers.usda.gov/webdocs/publications/43833/43680_eib121.pdf?v=0",
										"The Estimated Amount, Value, and Calories of Postharvest Food Losses at the Retail and Consumer Levels in the United States"
									)}
								</Typography>
								<br />
								<Typography>
									In the below charts the values from that report are used to
									scale the reference values to account for food waste. This
									allows the data to be more specific. For example, Americans
									waste about 33% of their fruit, but only 9% of tree
									nuts/peanuts. This is accounted for in the reference diets in
									the charts.
								</Typography>
							</div>
						}
					/>
				</h2>
				<div
					style={{
						maxWidth: "80%",
						margin: "5px auto",
						display: "block",
						textAlign: "center"
					}}
				>
					<Typography>{this.state.foodWastePercent}% Wasted</Typography>
					<Slider
						step={1}
						value={this.state.foodWastePercent}
						aria-labelledby="label"
						onChange={this.handleFoodWasteChange}
					/>
				</div>

				<h2>
					Diet Composition
					<Help
						title="Diet Compositon"
						content={
							<div>
								<Typography variant="h4">Calories</Typography>
								<Typography>
									Note: Fat has 9 calories per gram, protein has 4 cal/g, and
									carbs have 4 cal/g or less. Thus, oil and fatty animal
									products may be a larger source of your calories than it may
									appear based on portion sizes.
								</Typography>
								<Typography variant="h4">Categories</Typography>
								<Typography>
									Roots and tubers include potatoes, yams, carrots, cassava, and
									other vegetables or starchs that grow underground.
								</Typography>
								<br />
								<Typography>
									Pulses are the grain seed of{" "}
									{getLink("https://en.wikipedia.org/wiki/Legume", "Legumes")},
									and include beans, chickpeas, alfalfa, lentils, peas, peanuts,
									and much more. All pulses are nitrogen-fixing, and thus do not
									require much, if any, fertilizer.
								</Typography>
								<Typography variant="h4">Source</Typography>
								<Typography>
									These food categories and corresponding data are from the
									World Research Institute's "Shifting Diets for a Sustainable
									Food Future".
								</Typography>
								<br />
								<Typography>
									Ranganathan, J. et al. 2016. “Shifting Diets for a Sustainable
									Food Future.” Working Paper, Installment 11 of Creating a
									Sustainable Food Future. Washington, DC: World Resources
									Institute. Accessible at http://www.worldresourcesreport.org.
								</Typography>
							</div>
						}
					/>
				</h2>
				<h4>Where do your calories come from (%)?</h4>
				<FoodEstimator
					handleDietCompositionChange={this.handleDietCompositionChange}
					dietComposition={this.state.dietComposition}
				/>

				{viz}
			</Wrapper>
		);
	}
}
