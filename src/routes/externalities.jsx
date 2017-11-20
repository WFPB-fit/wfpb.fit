import React, { Component } from 'react';
import Resources from '../components/resources/index.jsx';
import tags from '../assets/data/tags.json';
import { Tabs, Tab } from 'material-ui/Tabs';
import { filterStudiesByTags } from '../utils.jsx';

export default class Externalities extends Component {
	render() {
		return (
			<Tabs>
				<Tab label="Environment" >
					<Resources
						research={filterStudiesByTags(window.globalAppData.studies, tags.environment)}
					/>
				</Tab>
				<Tab label="Agribusiness" >
					<Resources
						research={filterStudiesByTags(window.globalAppData.studies, ['agribusiness'])}
					/>
				</Tab>
			</Tabs>
		);
	}
}
