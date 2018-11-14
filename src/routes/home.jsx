import React, { Component } from "react";

import Button from "@material-ui/core/Button";

import { WidthWrapper, getLink } from "../utils/GeneralUtils.jsx";
import Heading from "../components/heading";

import { Link } from "react-router-dom";

// import styled from "styled-components";
// const Emojis = styled.div`
// 	font-size: 25px;
// `;

export default class Home extends Component {
	render() {
		return (
			<div>
				<WidthWrapper>
					<Heading txt={window.globalAppData.appName} variant="h1" />
					<p>
						Learn about the <b>whole food, plant-based (WFPB)</b> diet. WFPB has
						been documented to{" "}
						<b>
							reverse heart disease, protect against type II diabetes, help
							prevent cancer, ease weightloss, improve autoimmune disease,
							extend lifespan
						</b>
						, and more.
					</p>
					<h3>DISCLAIMER</h3>
					<p>
						Discuss your diet with your doctor before making changes. Do not
						stop taking medications until a doctor says it is safe. Never be
						afraid of asking questions or getting a{" "}
						{getLink("/how-to#doctors", "second opinion")} from an accredited
						physician or dietitian.
					</p>
					<Heading id="what" txt="What is WFPBD?" variant="h2" />
					<p>
						A diet high in a diverse range of nutrient-dense plant foods and low
						in animal products or processed foods (such as oil, sugar, or
						refined grains).
					</p>
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
					{/* <img alt="WFPBD foods" src="/imgs/assets/foods/Fruits_Veg.jpg" /> */}
					<Heading id="why" txt="Why eat this way?" variant="h2" />
					<p>
						<b>
							Disease is expensive, time consuming, miserable, and difficult.
							WFPBD is a powerful way to help avoid disease.
						</b>
					</p>
					<p>
						<b>WFPBD is also an ethical way to eat. </b> Animal agriculture is
						the #1 cause of{" "}
						{getLink(
							"/research?selected=antibiotics#disease",
							"antibiotic resistance,"
						)}{" "}
						{getLink("/research?selected=water+use#disease", "water use,")}{" "}
						{getLink(
							"/research?selected=water+pollution#disease",
							"water pollution,"
						)}{" "}
						{getLink("/research?selected=water+use#disease", "land use,")}{" "}
						{getLink(
							"/research?selected=water+use#disease",
							"land degradation,"
						)}{" "}
						{getLink(
							"/research?selected=water+use#disease",
							"biodiversity loss,"
						)}{" "}
						{getLink(
							"/research?selected=water+plastic#disease",
							"oceanic plastic"
						)}{" "}
						and{" "}
						{getLink(
							"/research?selected=climate+change#disease",
							"climate change."
						)}
					</p>
					<p>
						<b>It's also cheap and tastes great.</b>
					</p>
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
					<p>
						Without expert training and a constant look into available research,{" "}
						<b>it can be difficult to know what to believe. </b>
						Studies can be poorly or dishonestly designed. Reviews/meta analysis
						can summarize research, but bias and politics can warp their
						conclusions. Food is a multi-trillion dollar industry, with most of
						the money flowing into unhealthy processed foods and animal
						products.
					</p>
					<p>
						<b>
							WFPBD has a large body of evidence to support it as a healthy way
							to eat.
						</b>{" "}
						Decades of diverse, quality {getLink("/research", "research")}{" "}
						support WFPBD. Governments, professional medical associations, and
						prominent physicians{" "}
						{getLink("/endorsements#orgs", "endorse", true)} WFPBD.
					</p> */}
				</WidthWrapper>
			</div>
		);
	}
}
