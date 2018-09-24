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

export default class Header extends Component {
	render() {
		return (
			<div>
				<AppBar position="static">
					<FlexToolbar>
						{/* left  */}
						<div>
							<Button component={Link} to="/">
								{window.globalAppData.appName}
							</Button>
						</div>

						{/* mid  */}
						<div>
							<Button component={Link} to="/research" color="secondary">
								Research
							</Button>
							<Button component={Link} to="/data" color="secondary">
								Data
							</Button>
							<Button component={Link} to="/media" color="secondary">
								Media
							</Button>
							<Button component={Link} to="/endorsements" color="secondary">
								Endorsements
							</Button>
						</div>

						{/* right  */}
						<div>
							<Button component={Link} to="/donate" color="secondary">
								Donate
							</Button>
						</div>
					</FlexToolbar>
				</AppBar>
			</div>
		);
	}
}
