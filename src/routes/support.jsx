import React, { Component } from "react";

import StripeDonationForm from "../components/stripeDonationForm";
import {
	WidthWrapper
	// , getLink
} from "../utils/GeneralUtils.jsx";
import Typography from "@material-ui/core/Typography";

import Charities from "../assets/data/charities.json";
import Resource from "../components/resource";
import Heading from "../components/heading";

export default class Support extends Component {
	render() {
		const groups = Charities.map(x => <Resource resource={x} key={x.id} />);

		return (
			<WidthWrapper>
				<Typography variant="h2">Support Us</Typography>
				<StripeDonationForm />

				<Heading id="orgs" txt="Charities" variant="h2" />
				<Typography variant="h6">
					More great organizations that could use your support
				</Typography>
				{groups}
				<Typography variant="h5">And many more!</Typography>
			</WidthWrapper>
		);
	}
}
