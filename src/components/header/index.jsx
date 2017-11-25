import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import styled from 'styled-components';

import {
	Link
} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.toggleDrawer = this.toggleDrawer.bind(this);
		this.closeDrawer = this.closeDrawer.bind(this);

		this.state = {
			drawerOpen: false
		};
		this.StyledMenu = styled(Menu)`
		position:absolute;
		width:100%;
		`;
		this.BottomMenu = styled(this.StyledMenu) `
		bottom:0;
		`;
	}
	toggleDrawer() {
		this.setState({ drawerOpen: !this.state.drawerOpen });
	}
	closeDrawer(e) {
		this.setState({ drawerOpen: false });
	}

	render() {
		return (
			<div>
				<AppBar
					title={window.globalAppData.appName}
					// onTitleTouchTap={handleTouchTap}
					onLeftIconButtonTouchTap={this.toggleDrawer}
				/>
				<Drawer
					docked={false}
					onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
					open={this.state.drawerOpen}>
					<AppBar
						showMenuIconButton={false}
						title={window.globalAppData.appName}
						// onTitleTouchTap={handleTouchTap}
						onLeftIconButtonTouchTap={this.toggleDrawer}
					/>
					<this.StyledMenu
						autoWidth={false}
					>
						<MenuItem
							containerElement={<Link to="/" />}
							primaryText="Home"
							onClick={this.closeDrawer}
						/>
						<MenuItem
							containerElement={<Link to="/health" />}
							primaryText="Health"
							onClick={this.closeDrawer}
						/>
						<MenuItem
							containerElement={<Link to="/externalities" />}
							primaryText="Externalities"
							onClick={this.closeDrawer}
						/>
						<MenuItem
							containerElement={<Link to="/food" />}
							primaryText="Compare Foods"
							onClick={this.closeDrawer}
						/>
						<MenuItem
							containerElement={<Link to="/how-to" />}
							primaryText="How To"
							onClick={this.closeDrawer}
						/>
						<MenuItem
							containerElement={<Link to="/learn-more" />}
							primaryText="Learn More"
							onClick={this.closeDrawer}
						/>
						<MenuItem
							containerElement={<Link to="/endorsements" />}
							primaryText="Endorsements"
							onClick={this.closeDrawer}
						/>
					</this.StyledMenu>
					<this.BottomMenu
						autoWidth={false}
					>
						<MenuItem
							containerElement={<Link to="/donate" />}
							primaryText="Donate"
							onClick={this.closeDrawer}
						/>
					</this.BottomMenu>
				</Drawer>
			</div>
		);
	}
}
