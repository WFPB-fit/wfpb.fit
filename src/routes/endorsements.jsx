import React, { Component } from "react";
// import styled from 'styled-components';

import Resource from "../components/resource/index.jsx";
import { preprocess } from "../utils/GeneralUtils.jsx";
import endorsements from "../assets/data/endorsements.json";
import LinkableTabs from "../components/tabsDisplay/LinkableTabs.jsx";
import { WidthWrapper } from "../utils/GeneralUtils";
import Heading from "../components/heading";

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
					<div style={celebStyle}>
						<Resource resource={x} key={x.id} />
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
				<Heading id="orgs" txt="Organizations" variant="h2" />
				{orgs}
				<Heading id="physicians" txt="Physicians" variant="h2" />
				{doctors}
				<Heading id="athletes" txt="Athletes" variant="h2" />
				<LinkableTabs tabs={this.athleteTabs} />
				<Heading id="celebs" txt="Celebrities" variant="h2" />
				{celebs}
				<h3>And More!</h3>
			</WidthWrapper>
		);
	}
}
