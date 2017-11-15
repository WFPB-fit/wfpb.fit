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

		this.state = {
			drawerOpen: false
		};
	}
	toggleDrawer() {
		this.setState({ drawerOpen: !this.state.drawerOpen })
	}
	render() {
		const NoScrollMI = styled(MenuItem) `
		max-width: 100vw;
		box-sizing:border-box;
		overflow:hidden;
		`;
		const BottomMenu = styled(Menu) `
		bottom:0;
		position:absolute;
		`;
		return (
			<div>
				<AppBar
					title="Title"
					// onTitleTouchTap={handleTouchTap}
					onLeftIconButtonTouchTap={this.toggleDrawer}
				/>
				<Drawer
					docked={false}
					onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
					open={this.state.drawerOpen}>
					<Menu>
						<NoScrollMI
							containerElement={<Link to="/" />}
							primaryText="Home"
						/>
						<NoScrollMI
							containerElement={<Link to="/health" />}
							primaryText="Health"
						/>
						<NoScrollMI
							containerElement={<Link to="/externalities" />}
							primaryText="Externalities"
						/>
						<NoScrollMI
							containerElement={<Link to="/foods" />}
							primaryText="Foods"
						/>
						<NoScrollMI
							containerElement={<Link to="/how-to" />}
							primaryText="How To"
						/>
						<NoScrollMI
							containerElement={<Link to="/learn-more" />}
							primaryText="Learn More"
						/>
						<NoScrollMI
							containerElement={<Link to="/endorsements" />}
							primaryText="Endorsements"
						/>
					</Menu>
					<BottomMenu>
						<NoScrollMI
							containerElement={<Link to="/donate" />}
							primaryText="Donate"
						/>
					</BottomMenu>
				</Drawer>
			</div>
		);
	}
}
