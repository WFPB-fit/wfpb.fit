import React, { Component } from "react";

import LinkIcon from "@material-ui/icons/Link";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import { HashLink } from "react-router-hash-link";

export default class Heading extends Component {
	render() {
        console.log(this.props.variant)
		return (
			<Typography variant={this.props.variant}>
				<IconButton
					containerElement={<HashLink to={`#${this.props.id}`} />}
					id={this.props.id}
				>
					<LinkIcon />
				</IconButton>
				{this.props.txt}
			</Typography>
		);
	}
}
