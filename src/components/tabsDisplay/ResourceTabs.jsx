import React, { Component } from 'react';
import Resources from '../resources/index.jsx';
import { Tabs, Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router-dom';
import LinkableTabs from './LinkableTabs.jsx';

export default class ResourceTabs extends Component {
	render() {
		const NonBlockedResources = withRouter(Resources);
		const tabData = this.props.tabs.map((x) => {
			let content = (<p>{x.resources}</p>);
			if (typeof x.resources !== 'string') {
				content = (
					<NonBlockedResources
						research={x.resources}
						tags={x.tags}
					/>);
			}
			return { label: x.label, component: content }
		})

		return (
			<LinkableTabs
				tabs={tabData}
			/>
		);
	}
}