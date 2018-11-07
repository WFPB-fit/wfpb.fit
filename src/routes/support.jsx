/*global Stripe*/

import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

const live_key = "pk_live_gYNCfpHpLEzEPpKk3qjjklwV";
const test_key = "pk_test_pYPBajqbOoTntc5A3B5XmTWJ";
const key = test_key;
const stripe = Stripe(key);

const minDonationAmount = 0.5;

export default class HowTo extends Component {
	state = {
		donationAmount: null
	};

	handleDonationAmountChange = event => {
		this.setState({ donationAmount: event.target.value });
	};
	submitDonation = () => {};
	
	render() {
		return (
			<div>
				<TextField
					label="Donation Amount"
					value={this.state.donationAmount}
					onChange={this.handleDonationAmountChange}
					type="number"
					margin="normal"
					inputProps={{
						min: 0,
					}}
				/>
			</div>
		);
	}
}
