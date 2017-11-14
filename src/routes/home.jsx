import React, { Component } from 'react';
import Studies from '../components/studies/index.jsx';
import tags from '../assets/data/tags.json';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class Home extends Component {
	render() {
		return (
			<Tabs>
				<Tab label="Disease" >
					<Studies
						research={window.globalAppData.studies}
						tags={tags.disease}
					/>
				</Tab>
				<Tab label="Food" >
					<Studies
						research={window.globalAppData.studies}
						tags={tags.food}
					/>
				</Tab>
				<Tab label="Nutrients" >
					<Studies
						research={window.globalAppData.studies}
						tags={tags.nutrients}
					/>
				</Tab>
			</Tabs>
		);
	}
}
