import React, { Component } from 'react';
import Resource from '../components/resource/index.jsx';
import { Tabs, Tab } from 'material-ui/Tabs';
import { preprocess } from '../utils.jsx';
import endorsements from '../assets/data/endorsements.json';

export default class Externalities extends Component {
	render() {
		console.log(preprocess(endorsements.doctors))
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
				{doctors}
			</div>
		);
	}
}
