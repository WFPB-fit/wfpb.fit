import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';


import {
	Link
} from 'react-router-dom';

const bottomLinks = [
	{ txt: 'Donate', href: '/donate' },
];

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.getListItemLinks = this.getListItemLinks.bind(this);
	}

	getListItemLinks(listData) {
		return listData.map(x => {
			return (
				<ListItem
					button
					component={Link}
					to={x.href}
					key={x.href}
				>
					<ListItemText primary={x.txt} />
				</ListItem>
			);
		})
	}

	render() {
		return (
			<div>
				<AppBar position="static">
					<Toolbar>
						<IconButton color="secondary" aria-label="Menu" onClick={this.props.toggleDrawer}>
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="secondary">
							{window.globalAppData.appName}
						</Typography>
					</Toolbar>
				</AppBar>

				<Drawer open={this.props.drawerOpen} onClose={this.props.closeDrawer}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.props.toggleDrawer}
						onKeyDown={this.props.toggleDrawer}
					>
						<List>
							{this.getListItemLinks(window.navLinks)}
						</List>
						<Divider />
						<List>
							{this.getListItemLinks(bottomLinks)}
						</List>
					</div>
				</Drawer>
			</div>
		);
	}
}
