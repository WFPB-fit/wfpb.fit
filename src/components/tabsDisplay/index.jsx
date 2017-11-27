import React, { Component } from 'react';
import Resources from '../resources/index.jsx';
import { Tabs, Tab } from 'material-ui/Tabs';
import {
	withRouter
} from 'react-router-dom';

export default class Health extends Component {
	constructor(props) {
		super(props);
		this.onActive = this.onActive.bind(this);
		this.getDefaultActiveTab = this.getDefaultActiveTab.bind(this);
	}
	onActive(tab) {
		const tabName = tab.props.label.toLowerCase();
		this.props.history.replace(`#${tabName}`);
	}
	getDefaultActiveTab() {
		const hash = this.props.location.hash;
		const match = this.props.tabs.find((el) => {
			return `#${el.label.toLowerCase()}` === hash;
		})
		return (match) ? match.position : 0;
	}
	render() {
		const NonBlockedResources = withRouter(Resources);
		return (
			<Tabs
				initialSelectedIndex={this.getDefaultActiveTab()}
			>
				{
					this.props.tabs.map((x) => {
						let content = x.resources;
						if (typeof x.resources !== 'string') {
							content = (
								<NonBlockedResources
									research={x.resources}
									tags={x.tags}
								/>);
						}

						return (
							<Tab
								label={x.label}
								onActive={this.onActive}
								key={x.position}
							>
								{content}
							</Tab>
						);
					})
				}
			</Tabs>
		);
	}
}
