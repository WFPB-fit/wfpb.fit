import React, { Component } from 'react';
import Resources from '../components/resources/index.jsx';
import tags from '../assets/data/tags.json';
import { Tabs, Tab } from 'material-ui/Tabs';
import { filterStudiesByTags } from '../utils.jsx';

export default class Health extends Component {
	render() {
		return (
			<Tabs>
				<Tab label="Disease" >
					<Resources
						research={filterStudiesByTags(window.globalAppData.studies, tags.disease)}
					/>
				</Tab>
				<Tab label="Food" >
					<Resources
						research={filterStudiesByTags(window.globalAppData.studies, tags.food)}
					/>
				</Tab>
				<Tab label="Nutrients" >
					<Resources
						research={filterStudiesByTags(window.globalAppData.studies, tags.nutrients)}
					/>
				</Tab>
			</Tabs>
		);
	}
}
