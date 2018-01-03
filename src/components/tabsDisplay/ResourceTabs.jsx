import React, { Component } from 'react';
import Resources from '../resources/index.jsx';
import { Tabs, Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router-dom';
import LinkableTabs from './LinkableTabs.jsx';
import LinkableTab from './LinkableTab.jsx';

export default class ResourceTabs extends Component {
	render() {
		const NonBlockedResources = withRouter(Resources);
		return (
			<LinkableTabs
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
							<LinkableTab
								label={x.label}
								key={x.position}
							>
								{content}
							</LinkableTab>
						);
					})
				}
			</LinkableTabs>
		);
	}
}
