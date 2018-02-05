import React, { Component } from 'react';
import ResourceTabs from '../components/tabsDisplay/ResourceTabs.jsx';
import { WidthWrapper } from '../utils/GeneralUtils.jsx';
import Endorsements from '../components/endorsements';

export default class Health extends Component {
	constructor(props) {
		super(props);

		this.tabs = [{
			label: 'Endorsements',
			component: <Endorsements />
		}, {
			label: 'Documentaries',
			resources: window.globalAppData.learnMore.documentaries
		}, {
			label: 'Books',
			resources: window.globalAppData.learnMore.books
		}, {
			label: 'Videos',
			resources: window.globalAppData.learnMore.videos
		}, {
			label: 'Wikipedia',
			resources: window.globalAppData.learnMore.wikipedia
		},
		];
	}
	render() {
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
