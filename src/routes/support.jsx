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

import EmailSubscriptionSignupHTML from "../components/sendInBlueEmailSubscription/index.html";

export default class Support extends Component {
	render() {
		const groups = Charities.map(x => <Resource resource={x} key={x.name} />);

		return (
			<WidthWrapper>
				<Heading id="support-us" txt="Support Us" variant="h4" />
				<StripeDonationForm />
				<Heading id="subscribe" txt="Subscribe" variant="h4" />
				<div
					style={{ width: "50%", minWidth: "300px", margin: "0 auto" }}
					dangerouslySetInnerHTML={{ __html: EmailSubscriptionSignupHTML }}
				/>{" "}
				<Heading id="charities" txt="Charities" variant="h4" />
				<Typography variant="h6">
					More great organizations that could use your support
				</Typography>
				{groups}
				<Typography variant="h6" style={{ margin: "20px 0" }}>
					And many more!
				</Typography>
			</WidthWrapper>
		);
	}
}
