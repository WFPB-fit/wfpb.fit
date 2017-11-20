import React, { Component } from 'react';
import Resource from '../components/resource/index.jsx';
import { preprocess } from '../utils.jsx';
import endorsements from '../assets/data/endorsements.json';
import styled from 'styled-components';
import TabsDisplay from '../components/tabsDisplay/index.jsx';

export default class Externalities extends Component {
	constructor(props) {
		super(props);
		this.tabs = [{
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
		const doctors = preprocess(endorsements.doctors).map((x) =>
			(
				<Resource
					resource={x}
					key={x.id}
				/>
			)
		);

		const Div = styled.div`
		& p,h3 {
			text-align:center;
		}
		`;
		return (
			<Div>
				{/* <p>All of the following individuals are vegan, vegetarian, or plant based.</p> */}
				<h2>Physicians</h2>
				{doctors}
				<h2>Celebrities</h2>
				<p>{endorsements.celebrities}</p>
				<h2>Athletes</h2>
				<TabsDisplay
					tabs={this.tabs}
					location={this.props.location}
					history={this.props.history}
				/>
				<h2>Animals</h2>
				<p>{endorsements.animals}</p>
				<h3>And many more individuals all around the globe</h3>
			</Div>
		);
	}
}
