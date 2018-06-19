import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import List from '@material-ui/core/List';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Divider from 'material-ui/Divider';


import {
	Link
} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';

const bottomLinks = [
	{ txt: 'Donate', href: '/donate' },
];

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.toggleDrawer = this.toggleDrawer.bind(this);
		this.closeDrawer = this.closeDrawer.bind(this);
		this.getListItemLinks = this.getListItemLinks.bind(this);

		this.state = {
			drawerOpen: false
		};

		this.props.saveOpenDialog(this.toggleDrawer);
	}
	toggleDrawer() {
		this.setState({ drawerOpen: !this.state.drawerOpen });
	}
	closeDrawer(e) {
		this.setState({ drawerOpen: false });
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
						<IconButton color="secondary" aria-label="Menu" onClick={this.toggleDrawer}>
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="secondary">
							{window.globalAppData.appName}
						</Typography>
					</Toolbar>
				</AppBar>

				<Drawer open={this.state.drawerOpen} onClose={this.closeDrawer}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer}
						onKeyDown={this.toggleDrawer}
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
