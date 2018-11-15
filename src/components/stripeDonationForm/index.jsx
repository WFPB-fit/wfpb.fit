/* global  StripeCheckout */

import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

const minDonationAmount = 0.5;

const backendUrl =
	"https://2oxgc88kd9.execute-api.eu-central-1.amazonaws.com/production";

const live_key = "pk_live_gYNCfpHpLEzEPpKk3qjjklwV";
const test_key = "pk_test_pYPBajqbOoTntc5A3B5XmTWJ";
let key = test_key;
if (process.env.NODE_ENV === "production") {
	key = live_key;
}

export default class StripeDonationForm extends Component {
	state = {
		donationAmount: 1,
		isDonationError: false,
		donationResponse: ""
	};

	componentDidMount() {
		this.handler = StripeCheckout.configure({
			key: key,
			locale: "auto",
			name: "WFPB.FIT SPC",
			description: "One-time non tax-deductible donation",
			token: token => {
				// Send the donation to your server
				console.log("Submitting donation to server");

				fetch(`${backendUrl}/charge`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						stripeToken: token.id,
						chargeAmount: Math.round(100 * this.state.donationAmount) // Needs to be an integer in cents
					})
				})
					.then(res => {
						return res.text();
					})
					.then(txt => {
						console.log(txt);
						this.setState({ donationResponse: txt });
					})
					.catch(error => {
						this.setState({
							donationResponse:
								"There was an issue sending your request. Please try again later"
						});
					});
			}
		});

		// Close Checkout on page navigation:
		window.addEventListener(
			"popstate",
			function() {
				this.handler.close();
			}.bind(this)
		);
	}

	static isDonationInvalid(amount) {
		return isNaN(amount) || amount < minDonationAmount;
	}

	handleDonationAmountChange = event => {
		const amount = event.target.value;
		this.setState({
			donationAmount: amount,
			isDonationError: StripeDonationForm.isDonationInvalid(amount)
		});
	};

	formSubmit = async event => {
		console.log("form submitted");
		event.preventDefault();

		this.handler.open();
	};

	render() {
		return (
			<div>
				<Typography
					style={{
						display: this.state.donationResponse.length > 0 ? "block" : "none"
					}}
				>
					{this.state.donationResponse}
				</Typography>
				<form style={{ textAlign: "center" }} onSubmit={this.formSubmit}>
					<TextField
						style={{ textAlign: "center" }}
						error={this.state.isDonationError}
						helperText="Minimum donation: $0.50"
						label="Donation Amount ($)"
						value={this.state.donationAmount}
						onChange={this.handleDonationAmountChange}
						type="number"
						margin="normal"
						inputProps={{
							min: 0
						}}
					/>
					<br />
					<Button variant="contained" color="primary" type="submit">
						Start Donation
					</Button>
				</form>
			</div>
		);
	}
}
