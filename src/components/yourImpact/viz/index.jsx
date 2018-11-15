import React, { Component } from "react";

import styled from "styled-components";

import WRI from "../../../assets/data/environment/wri.js";
import Typography from "@material-ui/core/Typography";
import { titleize, getLink } from "../../../utils/GeneralUtils";
import VizHelpExplanation from "./help";
import ModifiableUnitBarChart from "../../modifiableUnitBarChart";

import FoodWaste from "../../../assets/data/environment/foodWaste";

import Help from "../../help";

const ContainerDiv = styled.div`
	text-align: center;
`;

const LeftH2 = styled.h2`
	text-align: left;
`;

export default class CalorieForm extends Component {
	getEnvImpact(dietFoods, impactType, foodWastePercent = null) {
		const dietComponentsCalories = Object.keys(dietFoods).reduce(
			(sum, foodType) => {
				const usage = (dietFoods[foodType] || 0) / 100.0;
				let foodImpact = sum + WRI[impactType][foodType] * usage;
				if (foodWastePercent === null) {
					const wastedPercent = FoodWaste[foodType] / 100;
					foodImpact = foodImpact / (1 - wastedPercent);
				}
				return foodImpact;
			},
			0
		);
		const cals = this.props.dailyCalories || 0;
		const calRatio = (cals * 365.25) / 1000000; //WRI is data is for 1 million calories

		let scaledImpact = calRatio * dietComponentsCalories;
		if (foodWastePercent !== null) {
			scaledImpact /= 1 - this.props.foodWastePercent / 100;
		}

		return scaledImpact;
	}

	getEnvData(impactType) {
		let foodUsageData = this.props.refFoodUsages.slice(); //copy
		foodUsageData.push({ label: "You", data: this.props.foodUsage });
		foodUsageData = foodUsageData.map(x => {
			let y;
			if (x.label === "You") {
				y = this.getEnvImpact(x.data, impactType, this.props.foodWastePercent);
			} else {
				y = this.getEnvImpact(x.data, impactType);
			}
			return { x: titleize(x.label), y: y };
		});
		return foodUsageData;
	}

	render() {
		if (!this.props.foodUsage) return null;

		return (
			<ContainerDiv>
				<LeftH2>
					Your Food's Yearly Impact
					<VizHelpExplanation refFoodUsages={this.props.refFoodUsages} />
				</LeftH2>

				<h3>Land</h3>
				<ModifiableUnitBarChart
					units={WRI.units["land"]}
					data={this.getEnvData("land")}
				/>

				<h3>
					GHG
					<Help
						title="Greenhouse Gas Units"
						content={
							<Typography>
								Comparative Greenhouse Gas units can be found at the US Energy
								Information Administration{" "}
								{getLink(
									"https://www.eia.gov/tools/faqs/faq.php?id=307&t=11",
									"here"
								)}{" "}
								and{" "}
								{getLink(
									"https://www.eia.gov/environment/emissions/co2_vol_mass.php",
									"here"
								)}
							</Typography>
						}
					/>
				</h3>
				<ModifiableUnitBarChart
					units={WRI.units["ghg"]}
					data={this.getEnvData("ghg")}
				/>

				<h3>
					Water{" "}
					<Help
						title="Water units"
						content={
							<div>
								<Typography>
									Water units were found at the following locations:
									{getLink(
										"https://www.usbr.gov/lc/hooverdam/history/essays/jetflow.html",
										"Hoover Dam"
									)}
									,
									{getLink(
										"https://www.niagarafallsstatepark.com/niagara-falls-state-park/amazing-niagara-facts",
										"Niagara Falls"
									)}
									,
									{getLink(
										"https://en.wikipedia.org/wiki/Olympic-size_swimming_pool",
										"Olympic Swimming Pool"
									)}
									,
									{getLink(
										"https://www.home-water-works.org/indoor-use/showers",
										"Showers"
									)}
								</Typography>
							</div>
						}
					/>
				</h3>
				<ModifiableUnitBarChart
					units={WRI.units["water"]}
					data={this.getEnvData("water")}
				/>
			</ContainerDiv>
		);
	}
}
