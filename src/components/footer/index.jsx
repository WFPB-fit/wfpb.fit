import React, { Component } from "react";

import styled from "styled-components";
import { getLink } from "../../utils/GeneralUtils";

const FlexToolbar = styled.div``;

const Wrapper = styled.div`
	padding: 0 0;
	display: flex;
	justify-content: space-between;
	text-align: center;
`;

export default class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Wrapper>
				<div />
				<div>
					{getLink("https://github.com", "Issues?", false, false)}
					<br />
					{getLink("https://github.com", "Source", false, false)}
				</div>
				<div />
			</Wrapper>
		);
	}
}
