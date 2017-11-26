import React, { Component } from 'react';
import TabsDisplay from '../components/tabsDisplay/index.jsx';

export default class Health extends Component {
	constructor(props) {
		super(props);
		console.log(window.globalAppData.learnMore)
		this.tabs = [{
			label: 'Documentaries',
			resources: window.globalAppData.learnMore.documentaries,
			position: 0
		}, {
			label: 'Books',
			resources: window.globalAppData.learnMore.books,
			position: 1
		}, {
			label: 'Videos',
			resources: window.globalAppData.learnMore.videos,
			position: 2
		},{
			label: 'Wikipedia',
			resources: window.globalAppData.learnMore.wikipedia,
			position: 3
		},
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
