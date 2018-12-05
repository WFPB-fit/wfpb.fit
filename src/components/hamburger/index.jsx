import React, { Component } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";

export default class extends Component {
	state = {
		isOpen: false
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render() {
		return (
			<div>
				<IconButton
					color="inherit"
					aria-label="Open drawer"
					onClick={this.handleDrawerOpen}
				>
					<MenuIcon />
				</IconButton>

				<Drawer open={this.state.open} onClose={this.handleDrawerClose}>
					<List>
						{this.props.appRoutes.map(x => {
							return (
								<ListItem button component={Link} to={x.path} key={x.path} onClick={this.handleDrawerClose}>
									{x.txt}
								</ListItem>
							);
						})}
					</List>
				</Drawer>
			</div>
		);
	}
}
