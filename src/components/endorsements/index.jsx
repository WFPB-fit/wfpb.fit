import React, { Component } from 'react';
import styled from 'styled-components';

import Resource from '../resource/index.jsx';
import { preprocess, WidthWrapper } from '../../utils/GeneralUtils.jsx';
import endorsements from '../../assets/data/endorsements.json';
import ResourceTabs from '../tabsDisplay/ResourceTabs.jsx';

export default class Endorsements extends Component {
	constructor(props) {
		super(props);
		this.athleteTabs = [{
			label: 'Endurance',
			resources: endorsements.athletes.endurance,
			position: 0
		}, {
			label: 'Fighting',
			resources: endorsements.athletes.fighting,
			position: 1
		}, {
			label: 'Lifting',
			resources: endorsements.athletes.lifting,
			position: 2
		}, {
			label: 'Sports',
			resources: endorsements.athletes.sports,
			position: 3
		}];
	}
	render() {
		const orgs = preprocess(endorsements.organizations).map((x) =>
			(
				<Resource
					resource={x}
					key={x.id}
				/>
			)
		);
		const doctors = preprocess(endorsements.doctors).map((x) =>
			(
				<Resource
					resource={x}
					key={x.id}
				/>
			)
		);

		return (
			<div>
				<h2>Organizations</h2>
				{orgs}
				<h2>Physicians</h2>
				{doctors}
				<h2>Athletes</h2>
				<ResourceTabs
					notLinkable
					tabs={this.athleteTabs}
					location={this.props.location}
					history={this.props.history}
				/>
				<h2>Celebrities</h2>
				<p>{endorsements.celebrities}</p>
				<h3>And More!</h3>

				{/* <h2>Animals</h2>
				<p>{endorsements.animals}</p> */}
			</div >
		);
	}
}
