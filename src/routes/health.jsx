import React, { Component } from 'react';
import tags from '../assets/data/tags.json';
import { filterStudiesByTags } from '../utils/GeneralUtils.jsx';
import ResourceTabs from '../components/tabsDisplay/ResourceTabs.jsx';

export default class Health extends Component {
	constructor(props) {
		super(props);
		this.tabs = [{
			label: 'Disease',
			tags: tags.disease,
			resources: filterStudiesByTags(window.globalAppData.studies, tags.disease),
			position: 0
		}, {
			label: 'Food',
			tags: tags.food,
			resources: filterStudiesByTags(window.globalAppData.studies, tags.food),
			position: 1
		}, {
			label: 'Nutrients',
			tags: tags.nutrients,
			resources: filterStudiesByTags(window.globalAppData.studies, tags.nutrients),
			position: 2
		}
		];
	}
	render() {
		return (
			<ResourceTabs
				tabs={this.tabs}
				location={this.props.location}
				history={this.props.history}
			/>
		);
	}
}
