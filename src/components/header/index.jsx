import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import styled from "styled-components";
import { Link } from "react-router-dom";

const FlexToolbar = styled(Toolbar)`
	display: flex;
	justify-content: space-between;
	text-align: center;
`;

export default class Header extends Component {
	render() {
		return (
			<div>
				<AppBar position="static">
					<FlexToolbar>
						{/* left  */}
						<div>
							<Button component={Link} to="/" style={{ color: "white" }}>
								{window.globalAppData.appName}
							</Button>
						</div>

						{/* mid  */}
						<div>
							<Button
								component={Link}
								to="/research"
								style={{ color: "white" }}
							>
								Research
							</Button>
							<Button component={Link} to="/data" style={{ color: "white" }}>
								Data
							</Button>
							<Button component={Link} to="/media" style={{ color: "white" }}>
								Media
							</Button>
							<Button
								component={Link}
								to="/endorsements"
								style={{ color: "white" }}
							>
								Endorsements
							</Button>
						</div>

						{/* right  */}
						<div>
							<Button component={Link} to="/how-to" style={{ color: "white" }}>
								How-To
							</Button>
						</div>
					</FlexToolbar>
				</AppBar>
			</div>
		);
	}
}
