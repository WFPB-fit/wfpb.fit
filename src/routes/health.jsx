import React, { Component } from 'react';
import Resources from '../components/resources/index.jsx';
import tags from '../assets/data/tags.json';
import { Tabs, Tab } from 'material-ui/Tabs';

export default class Health extends Component {
	render() {
		return (
			<Tabs>
				<Tab label="Disease" >
					<Resources
						research={window.globalAppData.studies}
						tags={tags.disease}
					/>
				</Tab>
				<Tab label="Food" >
					<Resources
						research={window.globalAppData.studies}
						tags={tags.food}
					/>
				</Tab>
				<Tab label="Nutrients" >
					<Resources
						research={window.globalAppData.studies}
						tags={tags.nutrients}
					/>
				</Tab>
			</Tabs>
		);
	}
}
