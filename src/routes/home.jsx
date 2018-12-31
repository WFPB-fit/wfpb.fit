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
							<b>Eating unprocessed plant foods</b> such as fruit, vegetables,
							legumes, and whole-grains.
							<br />
							<b>Avoiding animal products</b> such as meat, eggs, dairy, or
							fish.
							<br />
							<b>Avoiding processed food</b> such as sugar, oil, and refined
							grains.
							{/* <Emojis>
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
						</Emojis> */}
						</Typography>
					</WidthWrapper>
				</Row>
				<Row>
					<WidthWrapper>
						{/* <img alt="WFPB foods" src="/imgs/assets/foods/Fruits_Veg.jpg" /> */}
						<Heading id="why" txt="Why eat this way?" variant="h4" />
						<Typography>
							Research shows <b>WFPB fights disease,</b> it reverses{" "}
							{getLink("/research?selected=heart+disease", "heart disease,")}{" "}
							protects against type II{" "}
							{getLink("/research?selected=diabetes", "diabetes,")} helps
							prevent {getLink("/research?selected=cancer", "cancer,")} eases{" "}
							{getLink("/research?selected=weight+loss", "weight loss,")}{" "}
							improves{" "}
							{getLink(
								"/research?selected=ibd_multiple+sclerosis_inflammation_lupus_arthritis",
								"autoimmune,"
							)}{" "}
							disease, extends{" "}
							{getLink("/research?selected=overall+mortality", "lifespan,")} and
							more.
						</Typography>
						<br />
						<Typography>
							<b>WFPB is a sustainable diet. </b> Animal agriculture is the #1
							cause of{" "}
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
								"climate change,"
							)}{" "}
							and{" "}
							{getLink(
								"/research?selected=antibiotics#disease",
								"antibiotic use,"
							)}{" "}
						</Typography>
						<br />
						<Typography>
							<b>WFPB is an ethical diet</b> that minimizes harm to animals.
						</Typography>
						<br />
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
