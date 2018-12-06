import React, { Component } from "react";
// import styled from 'styled-components';

import Resource from "../components/resource/index.jsx";
import { preprocess } from "../utils/GeneralUtils.jsx";
import endorsements from "../assets/data/endorsements.json";
import LinkableTabs from "../components/tabsDisplay/LinkableTabs.jsx";
import { WidthWrapper } from "../utils/GeneralUtils";
import Heading from "../components/heading";
import Typography from '@material-ui/core/Typography';

const celebStyle = {
	width: "45%",
	display: "inline-block",
	margin: "5px",
	verticalAlign: "top"
};

export default class Endorsements extends Component {
	constructor(props) {
		super(props);

		this.athleteTabs = [
			{
				label: "Endurance",
				component: Endorsements.getShortCards(endorsements.athletes.endurance)
			},
			{
				label: "Fighting",
				component: Endorsements.getShortCards(endorsements.athletes.fighting)
			},
			{
				label: "Lifting",
				component: Endorsements.getShortCards(endorsements.athletes.lifting)
			},
			{
				label: "Sports",
				component: Endorsements.getShortCards(endorsements.athletes.sports)
			}
		];
	}

	static getShortCards(data) {
		return (
			<div style={{ textAlign: "center" }}>
				{preprocess(data).map(x => (
					<div key={x.id} style={celebStyle}>
						<Resource resource={x} />
					</div>
				))}
			</div>
		);
	}

	render() {
		const orgs = preprocess(endorsements.organizations).map(x => (
			<Resource resource={x} key={x.id} />
		));
		const doctors = preprocess(endorsements.doctors).map(x => (
			<Resource resource={x} key={x.id} />
		));

		const celebs = Endorsements.getShortCards(endorsements.celebrities);

		return (
			<WidthWrapper>
				<Heading id="orgs" txt="Organizations" variant="h4" />
				{orgs}
				<Heading id="physicians" txt="Physicians" variant="h4" />
				<Typography variant="h6">
					The following individuals have advocated for a whole food, plant-based
					diet to improve public health.
				</Typography>
				{doctors}
				<Heading id="athletes" txt="Athletes" variant="h4" />
				<Typography variant="h6">
					The following individuals eat a vegetarian, vegan, or whole food,
					plant-based diet.
				</Typography>
				<LinkableTabs tabs={this.athleteTabs} />
				<Heading id="celebs" txt="Celebrities" variant="h4" />
				<Typography variant="h6">
					The following individuals eat a vegetarian, vegan, or whole food,
					plant-based diet.
				</Typography>
				{celebs}
				<Heading txt="And many more!" variant="h5" hideLink />
			</WidthWrapper>
		);
	}
}
