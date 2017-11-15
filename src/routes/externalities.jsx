import React, { Component } from 'react';
import Resources from '../components/resources/index.jsx';
import tags from '../assets/data/tags.json';
import { Tabs, Tab } from 'material-ui/Tabs';

export default class Externalities extends Component {
	render() {
		return (
			<Tabs>
				<Tab label="Environment" >
					<Resources
						research={window.globalAppData.studies}
						tags={tags.environment}
					/>
				</Tab>
			</Tabs>
		);
	}
}
