import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";

import Help from "../../help";
import FoodEstimator from "../../foodEstimator";
import { titleize, getLink } from "../../../utils/GeneralUtils";

export default class DataVizHelp extends Component {
	render() {
		return (
			<Help
				title="Estimated Diet Comparisons"
				content={
					<div>
						<Typography variant="h5">Source</Typography>{" "}
						<Typography>
							{getLink(
								"http://www.wri.org/sites/default/files/Shifting_Diets_for_a_Sustainable_Food_Future_1.pdf",
								"Shifting Diets for a Sustainable Food Future: Creating a Sustainable Food Future, Installment Eleven"
							)}{" "}
							- by the World Resources Institute
						</Typography>{" "}
						<Typography variant="h5">Reference Diets</Typography>
						<Typography>
							These diets are estimates; there isn't much available data for
							this. The "American" Diet is loosely adapted from the{" "}
							{getLink(
								"https://www.ers.usda.gov/data-products/food-availability-per-capita-data-system/food-availability-per-capita-data-system",
								"2010 USDA ERS - Food availability per capita."
							)}
						</Typography>
						{this.props.refFoodUsages.map(x => {
							return (
								<div key={x.label}>
									<Typography variant="h6">{titleize(x.label)}</Typography>
									<FoodEstimator disabled dietComposition={x.data} />
								</div>
							);
						})}
						<Typography variant="h5">Food Waste</Typography>
						<Typography>
							All reference diets incorporate retail and consumer food waste in
							their environmental impact. Each food group is wasted at different
							rates by consumers, these values are taken from{" "}
							{getLink(
								"https://www.ers.usda.gov/webdocs/publications/43833/43680_eib121.pdf?v=0",
								"The Estimated Amount, Value, and Calories of Postharvest Food Losses at the Retail and Consumer Levels in the United States"
							)}{" "}
							(USDA).
						</Typography>
					</div>
				}
			/>
		);
	}
}
