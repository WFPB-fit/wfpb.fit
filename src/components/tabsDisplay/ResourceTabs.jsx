import React, { Component } from "react";
import Resources from "../resources/index.jsx";

import { withRouter } from "react-router-dom";
import LinkableTabs from "./LinkableTabs.jsx";
import Typography from "@material-ui/core/Typography";

export default class ResourceTabs extends Component {
	render() {
		const NonBlockedResources = withRouter(Resources);
		const tabData = this.props.tabs.map(x => {
			let content = x.component;
			if (!content) {
				content = <Typography>{x.resources}</Typography>;
				if (typeof x.resources !== "string") {
					content = (
						<NonBlockedResources research={x.resources} tags={x.tags} />
					);
				}
			}
			return { label: x.label, component: content };
		});

		return <LinkableTabs notLinkable={this.props.notLinkable} tabs={tabData} />;
	}
}
