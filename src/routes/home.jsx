import React, { Component } from "react";

import Button from "@material-ui/core/Button";

import { WidthWrapper, getLink } from "../utils/GeneralUtils.jsx";
import Heading from "../components/heading";

import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import withWindowDimensions from "../components/withWindowSize";

import styled from "styled-components";
import CenteredTextImage from "../components/centeredtextImage/index.jsx";
const Emojis = styled.div`
	font-size: 25px;
`;
const Row = styled.div`
	padding: 50px 0;
`;

class MyComponent extends Component {
	render() {
		const titleSize = this.props.isMobileSize ? "h2" : "h1";
		return (
			<div>
				<CenteredTextImage src="/imgs/assets/foods/veges.jpg">
					<Typography style={{ color: "white" }} variant={titleSize}>
						<b>{window.globalAppData.appName}</b>
					</Typography>
					<Typography
						variant="h6"
						style={{ textAlign: "center", color: "white" }}
					>
						Whole Food, Plant-Based Diet
					</Typography>
				</CenteredTextImage>
				<Row>
					<WidthWrapper>
						<Heading id="what" txt="What is WFPB?" variant="h4" />
						<Typography>
							<b>
								A diet of diverse, nutrient-dense plant foods with minimal
								animal products or processed foods
							</b>{" "}
							(such as oil, sugar, or refined grains). It's a diet that has been
							documented to{" "}
							<b>
								{" "}
								reverse{" "}
								{getLink(
									"/research?selected=heart+disease",
									"heart disease,"
								)}{" "}
								protect against type II {" "}
								{getLink(
									"/research?selected=diabetes",
									"diabetes,"
								)}{" "} help prevent {" "}
								{getLink(
									"/research?selected=cancer",
									"cancer,"
								)}{" "} ease
								{" "}
								{getLink(
									"/research?selected=weight+loss",
									"weight loss,"
								)}{" "} improve {" "}
								{getLink(
									"/research?selected=ibd_multiple+sclerosis_inflammation_lupus_arthritis",
									"autoimmune,"
								)}{" "} disease, extend {" "}
								{getLink(
									"/research?selected=overall+mortality",
									"lifespan,"
								)}{" "} and
								more.
							</b>
						</Typography>
						<Emojis>
							<span
								role="img"
								aria-label="Emojis of fruit, vegetables, and mushrooms"
							>
								✔️ - 🥕🍅🥒🌿🍆🍄🥔🌱🥦🌾🥝🍓🍋🍈🍊🍍🍐🍇🍉🍌🍒🥑🍎🥜🌰🌶️🌽🍠🍵
							</span>
							<br />
							<span
								role="img"
								aria-label="Emojis of fruit, vegetables, and mushrooms"
							>
								❌ - 🥩🥚🥛🧀🐖🐄🐔🦃🐟🦐{" "}
							</span>
							<br />
							<span
								role="img"
								aria-label="Emojis of fruit, vegetables, and mushrooms"
							>
								❌ - 🍬🥐🍟🍦🥧🍺{" "}
							</span>
						</Emojis>
					</WidthWrapper>
				</Row>
				<Row>
					<WidthWrapper>
						{/* <img alt="WFPB foods" src="/imgs/assets/foods/Fruits_Veg.jpg" /> */}
						<Heading id="why" txt="Why eat this way?" variant="h4" />
						<Typography>
							Disease is expensive, time consuming, miserable, and difficult.
							WFPB is a powerful way to help avoid disease.
						</Typography>
						<Typography>
							<b>WFPB is also an ethical way to eat. </b> Animal agriculture is
							the #1 cause of{" "}
							{getLink(
								"/research?selected=water+use#environment",
								"water use,"
							)}{" "}
							{getLink(
								"/research?selected=water+pollution#environment",
								"water pollution,"
							)}{" "}
							{getLink("/research?selected=lan+use#environment", "land use,")}{" "}
							{getLink(
								"/research?selected=land+degradation#environment",
								"land degradation,"
							)}{" "}
							{getLink(
								"/research?selected=biodiversity+loss#environment",
								"biodiversity loss,"
							)}{" "}
							{getLink(
								"/research?selected=water+plastic#environment",
								"oceanic plastic"
							)}{" "}
							{getLink(
								"/research?selected=climate+change#environment",
								"climate change."
							)}
							and{" "}
							{getLink(
								"/research?selected=antibiotics#disease",
								"antibiotic use,"
							)}{" "}
						</Typography>
						<Typography>
							<b>It's also cheap and tastes great.</b>
						</Typography>
						<h3>DISCLAIMER</h3>
						<Typography>
							Discuss your diet with your doctor before making changes. Do not
							stop taking medications until a doctor says it is safe. Never be
							afraid of asking questions or getting a{" "}
							{getLink("/how-to#doctors", "second opinion")} from an accredited
							physician or dietitian.
						</Typography>

						<div style={{ display: "block", textAlign: "center" }}>
							<Button
								component={Link}
								variant="contained"
								color="primary"
								to="/how-to"
								style={{ color: "white" }}
							>
								Get Started
							</Button>
						</div>

						{/* <Heading
						id="certain"
						txt="How can I be sure of these benefits?"
						variant="h2"
					/>
					<Typography>
						Without expert training and a constant look into available research,{" "}
						<b>it can be difficult to know what to believe. </b>
						Studies can be poorly or dishonestly designed. Reviews/meta analysis
						can summarize research, but bias and politics can warp their
						conclusions. Food is a multi-trillion dollar industry, with most of
						the money flowing into unhealthy processed foods and animal
						products.
					</Typography>
					<Typography>
						<b>
							WFPB has a large body of evidence to support it as a healthy way
							to eat.
						</b>{" "}
						Decades of diverse, quality {getLink("/research", "research")}{" "}
						support WFPB. Governments, pr ofessional medical associations, and
						prominent physicians{" "}
						{getLink("/endorsements#orgs", "endorse", true)} WFPB.
					</Typography> */}
					</WidthWrapper>
				</Row>
			</div>
		);
	}
}

export default withWindowDimensions(MyComponent);
