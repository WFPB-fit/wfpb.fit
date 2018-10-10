import React, { Component } from "react";
// import styled from 'styled-components';

import Resource from "../components/resource/index.jsx";
import { preprocess } from "../utils/GeneralUtils.jsx";
import endorsements from "../assets/data/endorsements.json";
import ResourceTabs from "../components/tabsDisplay/ResourceTabs.jsx";
import { WidthWrapper } from "../utils/GeneralUtils";
import Heading from "../components/heading";

export default class Endorsements extends Component {
	constructor(props) {
		super(props);
		this.athleteTabs = [
			{
				label: "Endurance",
				resources: endorsements.athletes.endurance,
				position: 0
			},
			{
				label: "Fighting",
				resources: endorsements.athletes.fighting,
				position: 1
			},
			{
				label: "Lifting",
				resources: endorsements.athletes.lifting,
				position: 2
			},
			{
				label: "Sports",
				resources: endorsements.athletes.sports,
				position: 3
			}
		];
	}
	render() {
		const orgs = preprocess(endorsements.organizations).map(x => (
			<Resource resource={x} key={x.id} />
		));
		const doctors = preprocess(endorsements.doctors).map(x => (
			<Resource resource={x} key={x.id} />
));

		return (
			<WidthWrapper>
				<Heading id="orgs" txt="Organizations" variant="display2" />
				{orgs}
				<Heading id="physicians" txt="Physicians" variant="display2" />
				{doctors}
				<Heading id="athletes" txt="Athletes" variant="display2" />
				<ResourceTabs
					notLinkable
					tabs={this.athleteTabs}
					location={this.props.location}
					history={this.props.history}
				/>
				<Heading id="celebs" txt="Celebrities" variant="display2" />
				<p>{endorsements.celebrities}</p>
				<h3>And More!</h3>
			</WidthWrapper>
		);
	}
}
