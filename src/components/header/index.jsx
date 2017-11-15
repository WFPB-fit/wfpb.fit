import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';

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
						<MenuItem
							containerElement={<Link to="/" />}
							primaryText="Home"
						/>
						<MenuItem
							containerElement={<Link to="/externalities" />}
							primaryText="Externalities"
						/>
					</Menu>
				</Drawer>
			</div>
		);
	}
}
