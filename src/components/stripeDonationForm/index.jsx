/* global  StripeCheckout */

import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import { CircularProgress } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { getLink } from "../../utils/GeneralUtils";

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
		donationResponse: null,
		open: false
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
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
				this.setState({ donationResponse: null });
				this.handleOpen();

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
		const centerStyle = {
			top: `50%`,
			left: `50%`,
			position: `absolute`,
			transform: `translate(-50%, -50%)`
		};
		let modalStyle = Object.assign({}, centerStyle);
		modalStyle.minHeight = "20%";
		modalStyle.minWidth = "20%";
		modalStyle.padding = "5px";
		let msg = <Typography> {this.state.donationResponse}</Typography>;
		if (this.state.donationResponse === null) {
			msg = (
				<div style={centerStyle}>
					<CircularProgress />
				</div>
			);
		}

		return (
			<div style={{ maxWidth: "70%", margin: "5px auto" }}>
				<Modal open={this.state.open} onClose={this.handleClose}>
					<Paper style={modalStyle}>{msg}</Paper>
				</Modal>
				<form
					style={{ textAlign: "center", margin: "5px" }}
					onSubmit={this.formSubmit}
				>
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
				<Typography style={{ fontSize: "13px", textAlign: "center" }}>
					Donations are secured using{" "}
					{getLink("https://stripe.com/", "Stripe.")}
					Your information is encrypted and automatically transferred to
					financial institutions. This information is not made available to any
					other parties.
				</Typography>
			</div>
		);
	}
}
