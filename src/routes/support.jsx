import React, { Component } from "react";

import StripeDonationForm from "../components/stripeDonationForm";
import { WidthWrapper, getLink } from "../utils/GeneralUtils.jsx";
import Typography from "@material-ui/core/Typography";

export default class Support extends Component {
	render() {
		return (
			<WidthWrapper>
				<Typography variant="h3">Support us</Typography>
				<StripeDonationForm />
			</WidthWrapper>
		);
	}
}
