import React, { Component } from "react";

import LinkIcon from "@material-ui/icons/Link";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import { HashLink } from "react-router-hash-link";

export default class Heading extends Component {
	render() {
		const icon = this.props.id ? (
			<HashLink to={`#${this.props.id}`}>
				<IconButton id={this.props.id}>
					<LinkIcon />
				</IconButton>
			</HashLink>
		) : null;

		return (
			<Typography style={{ margin: "20px 0" }} variant={this.props.variant}>
				{!this.props.hideLink && icon}
				{this.props.txt}
			</Typography>
		);
	}
}
