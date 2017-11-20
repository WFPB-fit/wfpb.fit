import React, { Component } from 'react';
import tags from '../assets/data/tags.json';
import { filterStudiesByTags } from '../utils.jsx';
import TabsDisplay from '../components/tabsDisplay/index.jsx';

export default class Externalities extends Component {
	constructor(props) {
		super(props);
		const agribusinessTags = ['agribusiness'];

		this.tabs = [{
			label: 'Environment',
			tags: tags.environment,
			resources: filterStudiesByTags(window.globalAppData.studies, tags.environment),
			position: 0
		}, {
			label: 'Agribusiness',
			tags: agribusinessTags,
			resources: filterStudiesByTags(window.globalAppData.studies, agribusinessTags),
			position: 1
		}
		];
	}
	render() {
		return (
			<TabsDisplay
				tabs={this.tabs}
				location={this.props.location}
				history={this.props.history}
			/>
		);
	}
}
