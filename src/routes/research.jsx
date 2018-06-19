import React, { Component } from 'react';
import tags from '../assets/data/tags.json';
import { filterStudiesByTags, WidthWrapper } from '../utils/GeneralUtils.jsx';
import ResourceTabs from '../components/tabsDisplay/ResourceTabs.jsx';

export default class Research extends Component {
	constructor(props) {
		super(props);
		const agribusinessTags = ['agribusiness'];

		this.tabs = [{
			label: 'Disease',
			tags: tags.disease,
			resources: filterStudiesByTags(window.globalAppData.studies, tags.disease)
		}, {
			label: 'Food',
			tags: tags.food,
			resources: filterStudiesByTags(window.globalAppData.studies, tags.food)
		}, {
			label: 'Nutrients',
			tags: tags.nutrients,
			resources: filterStudiesByTags(window.globalAppData.studies, tags.nutrients)
		}, {
			label: 'Environment',
			tags: tags.environment,
			resources: filterStudiesByTags(window.globalAppData.studies, tags.environment),
			position: 0
		}, {
			label: 'Agribusiness',
			tags: agribusinessTags,
			resources: filterStudiesByTags(window.globalAppData.studies, agribusinessTags),
			position: 1
		}, {
			label: 'Animals',
			tags: [],
			resources: filterStudiesByTags({}, []),
			position: 2
		}
		];
	}
	render() {
		console.log(this.props)

		return (
			<WidthWrapper>
				<ResourceTabs
					tabs={this.tabs}
					location={this.props.location}
					history={this.props.history}
				/>
			</WidthWrapper>
		);
	}
}
