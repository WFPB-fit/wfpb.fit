import React, { Component } from 'react';
import Resources from '../components/resources/index.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class LearnMore extends Component {
	render() {
		return (
			<Tabs>
				<Tab label="Documentaries" >
					<Resources
						research={window.globalAppData.learnMore.documentaries}
					/>
				</Tab>
				<Tab label="Books" >
					<Resources
						research={window.globalAppData.learnMore.books}
					/>
				</Tab>
				<Tab label="Videos" >
					<Resources
						research={window.globalAppData.learnMore.videos}
					/>
				</Tab>
				<Tab label="Wikipedia" >
					<Resources
						research={window.globalAppData.learnMore.wikipedia}
					/>
				</Tab>
			</Tabs>
		);
	}
}
