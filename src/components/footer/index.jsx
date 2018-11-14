import React, { Component } from "react";

import styled from "styled-components";
import Button from "@material-ui/core/Button";
// import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

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
							Discuss your diet with your doctor before making changes
						</Typography>
					</div>
					<div>
						<Button
							color="primary"
							href="https://github.com"
							style={{ fontSize: "12px" }}
							target="_blank"
						>
							Source Code
						</Button>
					</div>
				</Wrapper>
			</div>
		);
	}
}
