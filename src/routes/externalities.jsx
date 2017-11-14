import React, { Component } from 'react';
import Studies from '../components/studies/index.jsx';
import tags from '../assets/data/tags.json';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class Externalities extends Component {
	render() {
		return (
			<Tabs>
				<Tab label="Environment" >
					<Studies
						research={window.globalAppData.studies}
						tags={tags.environment}
					/>
				</Tab>
			</Tabs>
		);
	}
}
