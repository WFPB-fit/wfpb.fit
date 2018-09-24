import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import styled from "styled-components";
import { Link } from "react-router-dom";

const FlexToolbar = styled(Toolbar)`
	display: flex;
	justify-content: space-between;
`;

const Center = styled.div`
	text-align: center;
`;

export default class Header extends Component {
	render() {
		return (
			<div>
				<AppBar position="static">
					<FlexToolbar>
						{/* left  */}
						<Center>
							<Button component={Link} to="/">
								{window.globalAppData.appName}
							</Button>
						</Center>

						{/* mid  */}
						<Center>
							<Button component={Link} to="/research">
								Research
							</Button>
							<Button component={Link} to="/data">
								Food Data
							</Button>
							<Button component={Link} to="/media">
								Media
							</Button>
							<Button component={Link} to="/endorsements">
								Endorsements
							</Button>
						</Center>

						{/* right  */}
						<Center>
							<Button component={Link} to="/donate">
								Donate
							</Button>
						</Center>
					</FlexToolbar>
				</AppBar>
			</div>
		);
	}
}
