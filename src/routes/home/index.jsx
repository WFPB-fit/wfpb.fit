import React, { Component } from 'react';
import Studies from '../../components/studies/index.jsx';
import health from '../../assets/data/health.json';
import tags from '../../assets/data/tags.json';
import {Tabs, Tab} from 'material-ui/Tabs';

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
		this.studies = Home.preprocessStudies(health);
	}
	render() {
		return (
			<Tabs>
				<Tab label="Disease" >
					<Studies
						research={this.studies}
						tags={tags.disease}
					/>
				</Tab>
				<Tab label="Food" >
					<Studies
						research={this.studies}
						tags={tags.food}
					/>
				</Tab>
				<Tab label="Nutrients" >
					<Studies
						research={this.studies}
						tags={tags.nutrients}
					/>
				</Tab>
			</Tabs>
		);
	}
}
