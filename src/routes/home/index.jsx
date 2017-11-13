import React, { Component } from 'react';
import Studies from '../../components/studies/index.jsx';
import health from '../../assets/data/health.json';

export default class Home extends Component {
	render() {
		return (
			<Studies
				research={health}
			/>
		);
	}
}
