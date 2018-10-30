import React, { Component } from "react";

import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
				<hr style={{margin:'10px 0 0 0'}}/>

				<Wrapper>
					<div>
						<Button
							component={Link}
							color="primary"
							to="/support-wfpb"
							style={{ fontSize: "12px" }}
						>
							Support
						</Button>
					</div>
					<div />
					<div>
						<Button
							color="primary"
							href="https://github.com"
							style={{ fontSize: "12px" }}
							target="_blank"
						>
							Report an Issue
						</Button>
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
