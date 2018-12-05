import React, { Component } from "react";

import styled from "styled-components";

import BgImg from "./backgroundImg.jsx";
import withWindowDimensions from "../withWindowSize/index.jsx";

const Center = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

class MyComponent extends Component {
	render() {
		const height = this.props.isMobileSize ? "400px" : "700px";
		return (
			<BgImg src={this.props.src} height={height}>
				<Center>{this.props.children}</Center>
			</BgImg>
		);
	}
}

export default withWindowDimensions(MyComponent);
