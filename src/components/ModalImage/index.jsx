import React, { Component } from "react";

import styled from "styled-components";
import Modal from "@material-ui/core/Modal";

export default class LinkableSelect extends Component {
	state = {
		open: false
	};

	handleOpen() {
		this.setState({ open: true });
	}

	handleClose() {
		this.setState({ open: false });
	}
	constructor(props) {
		super(props);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
	}

	render() {
		return (
			<div>
				<img
					src={this.props.src}
					alt={this.props.alt}
					onClick={this.handleOpen}
				/>
				<Modal
					// aria-labelledby="simple-modal-title"
					// aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}
				>
					<img
						style={{
							top: `50%`,
							left: `50%`,
							// transform: `translate(-50%, -50%)`
						}}
						src={this.props.src}
						alt={this.props.alt}
					/>
				</Modal>
			</div>
		);
	}
}
