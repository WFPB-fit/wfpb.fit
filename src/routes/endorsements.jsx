import React, { Component } from 'react';
import Resource from '../components/resource/index.jsx';
import { Tabs, Tab } from 'material-ui/Tabs';
import { preprocess } from '../utils.jsx';
import endorsements from '../assets/data/endorsements.json';
import styled from 'styled-components';

export default class Externalities extends Component {
	render() {
		const doctors = preprocess(endorsements.doctors).map((x) =>
			(
				<Resource
					resource={x}
					key={x.id}
				/>
			)
		);

		const Div = styled.div `
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
				<Tabs>
					<Tab label="Endurance" >
						<p>{endorsements.athletes.endurance}</p>
					</Tab>
					<Tab label="Fighting" >
						<p>{endorsements.athletes.fighting}</p>
					</Tab>
					<Tab label="Lifting" >
						<p>{endorsements.athletes.lifting}</p>
					</Tab>
					<Tab label="Sports" >
						<p>{endorsements.athletes.sports}</p>
					</Tab>
				</Tabs>
				<h2>Animals</h2>
				<p>{endorsements.animals}</p>
				<h3>And many more individuals all around the globe</h3>
			</Div>
		);
	}
}
