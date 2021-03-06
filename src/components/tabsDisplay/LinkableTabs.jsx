import React, { Component } from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Paper from "@material-ui/core/Paper";

import { withRouter } from "react-router-dom";
import withWindowDimensions from "../withWindowSize";

import styled from "styled-components";

const StyledTabs = styled(Tabs)`
	margin: 5px;
`;

class LinkableTabs extends Component {
	constructor(props) {
		super(props);
		this.getDefaultActiveTab = this.getDefaultActiveTab.bind(this);
		this.switchTab = this.switchTab.bind(this);

		this.state = {
			activeTabIndex: this.getDefaultActiveTab()
		};
	}
	getDefaultActiveTab() {
		const hash = decodeURI(this.props.location.hash)
			.toLowerCase()
			.slice(1); // remove the '#' at the beginning
		let initTabIndex = 0;

		if (!this.props.notLinkable && hash !== "") {
			this.props.tabs.forEach((x, i) => {
				const label = x.label;
				if (label.toLowerCase() === hash) initTabIndex = i;
			});
		}

		return initTabIndex;
	}

	switchTab(event, activeTabIndex) {
		this.setState({ activeTabIndex });

		//make shareable - modify URL
		if (!this.props.notLinkable) {
			const tabName = this.props.tabs[activeTabIndex].label.toLowerCase();
			this.props.history.replace(`#${tabName}`);
		}
	}
	render() {
        //filter out props from hitting DOM element
        //https://github.com/DefinitelyTyped/DefinitelyTyped/issues/13689#issuecomment-296246134
		const {
			match,
			location,
			history,
			staticContext,
            notLinkable,
            isMobileSize,
            windowHeight,
            windowWidth,
			...passedProps
        } = this.props; 

		return (
			<div>
				<Paper>
					<StyledTabs
						// fullWidth
						centered={!this.props.isMobileSize}
						scrollable={this.props.isMobileSize}
						scrollButtons={ (this.props.isMobileSize) ? "on" : "auto"}
						onChange={this.switchTab}
						value={this.state.activeTabIndex}
						{...passedProps}
					>
						{this.props.tabs.map(x => (
							<Tab key={x.label} label={x.label} />
						))}
					</StyledTabs>
				</Paper>
				{this.props.tabs[this.state.activeTabIndex].component}
			</div>
		);
	}
}

export default withWindowDimensions(withRouter(LinkableTabs));
