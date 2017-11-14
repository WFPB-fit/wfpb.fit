import React, { Component } from 'react';
import Studies from '../../components/studies/index.jsx';
import health from '../../assets/data/health.json';
import tags from '../../assets/data/tags.json';

export default class Home extends Component {
	static preprocessStudies(studies) {
		return studies.map((study, indx) => {
			study.tags = study.tags.split(',');
			study.id = indx;
			return study;
		});
	}
	constructor(props) {
		super(props);
		this.health = Home.preprocessStudies(health);
	}
	render() {
		return (
			<Studies
				research={this.health}
				tags={tags.disease}
			/>
		);
	}
}
