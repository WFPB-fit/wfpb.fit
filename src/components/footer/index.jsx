import React, { Component } from "react";

import styled from "styled-components";
import { getLink } from "../../utils/GeneralUtils";

const Wrapper = styled.div`
	padding: 0 0;
	display: flex;
	justify-content: space-between;
	text-align: center;
`;

export default class Header extends Component {
	render() {
		return (
			<div>
				<hr />

				<Wrapper>
					<div />
					<div>
						{getLink("https://github.com", "Report an Issue", false, false)}
						<br />
						{getLink("https://github.com", "Source code", false, false)}
					</div>
					<div />
				</Wrapper>
			</div>
		);
	}
}
