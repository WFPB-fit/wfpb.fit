import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import List from 'material-ui/List';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Divider from 'material-ui/Divider';


import {
	Link
} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';

const topLinks = [
	{ txt: 'Home', href: '/' },
	{ txt: 'Research', href: '/research' },
	{ txt: 'Compare Foods', href: '/food' },
	{ txt: 'Supplies', href: '/supplies' },
	{ txt: 'Learn More', href: '/learn-more' },
	{ txt: 'Endorsements', href: '/endorsements' },
];
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
						<IconButton color="contrast" aria-label="Menu" onClick={this.toggleDrawer}>
							<MenuIcon />
						</IconButton>
						<Typography type="title" color="inherit">
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
							{this.getListItemLinks(topLinks)}
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
