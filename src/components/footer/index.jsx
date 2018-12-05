import React, { Component } from "react";

import styled from "styled-components";
// import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import GithubIcon from "../githubIcon";

const Wrapper = styled.div`
	padding: 5px;
	display: flex;
	justify-content: space-between;
	text-align: center;
	box-sizing: border-box;
`;

export default class Header extends Component {
	render() {
		return (
			<div>
				<hr style={{ margin: "10px 0 0 0" }} />

				<Wrapper>
					<div />
					<div>
						<Typography>
							Talk with your doctor before making diet changes
						</Typography>
					</div>
					<div>
						<IconButton
							color="primary"
							href="https://github.com/WFPB-fit/wfpb.fit"
							target="_blank"
						>
							<GithubIcon />
						</IconButton>
					</div>
				</Wrapper>
			</div>
		);
	}
}
