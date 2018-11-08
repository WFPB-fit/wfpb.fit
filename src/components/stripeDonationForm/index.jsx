/* global  StripeCheckout */

import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";

const minDonationAmount = 0.5;
const backendUrl =
	"https://boqu8b2s6k.execute-api.us-east-1.amazonaws.com/latest";
// const live_key = "pk_live_gYNCfpHpLEzEPpKk3qjjklwV";
const test_key = "pk_test_pYPBajqbOoTntc5A3B5XmTWJ";

export default class StripeDonationForm extends Component {
	state = {
		donationAmount: 1,
		isDonationError: false,
		saveToEmailList: true,
		donationResponse: ""
	};

	componentDidMount() {
		this.handler = StripeCheckout.configure({
			key: test_key,
			locale: "auto",
			mode: "no-cors",
			name: "WFPB.FIT SPC",
			description: "One-time non tax-deductible donation",
			token: token => {
				// Send the donation to your server
				console.log("server pinged");

				fetch(`${backendUrl}/charge`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						stripeToken: token,
						chargeAmount: this.state.donationAmount,
						saveEmail: this.state.saveToEmailList
					})
				})
					.then(res => res.json())
					.then(json => {
						console.log("response is " + json);
						this.setState({ donationResponse: "Thank you for donating!" });
					})
					.catch(error => {
						this.setState({
							donationResponse:
								"There was an issue processing your request. Please try again later"
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
	handleSaveToEmailListChange = event => {
		this.setState({ saveToEmailList: event.target.value });
	};

	formSubmit = async event => {
		console.log("form submitted");
		event.preventDefault();

		const amount = this.state.donationAmount * 100; // Needs to be an integer!
		this.handler.open({
			amount: Math.round(amount)
		});
	};

	render() {
		return (
			<div>
				<p
					style={{
						display: this.state.stripeSubmissionError ? "block" : "none"
					}}
				>
					{this.state.donationResponse}
				</p>
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
					{/* <FormControlLabel
						control={
							<Checkbox
								checked={this.state.saveToEmailList}
								onChange={this.handleSaveToEmailListChange}
							/>
						}
						label="Save my email to mailing list after donation"
					/> */}
					<br />
					<Button variant="contained" color="primary" type="submit">
						Start Donation
					</Button>
				</form>
			</div>
		);
	}
}
