import React, { Component } from "react";

import KeyValueTable from "../components/keyValueTable";

import {
	WidthWrapper,
	getLink,
	VerticalMidAlignWrapper
} from "../utils/GeneralUtils.jsx";

import styled from "styled-components";

const Emojis = styled.div`
	font-size: 25px;
`;

export default class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<WidthWrapper>
					<h1>{window.globalAppData.appName}</h1>
					<p>
						This non-profit website aggregates resources about the{" "}
						<b>whole food, plant-based diet (WFPBD)</b>. WFPBD has been
						documented to{" "}
						<b>
							ease weightloss, reverse heart disease, protect against type II
							diabetes, help prevent cancer, improve autoimmune disease, extend
							lifespan
						</b>
						, and more.
					</p>
					<h3>DISCLAIMER</h3>
					<p>
						If you have an illness, discuss your diet with your doctor before
						making changes. Do not stop taking medications until a doctor says
						it is safe. Never be afraid of asking questions or getting a
						{getLink("https://www.plantbaseddoctors.org", "second opinion")}
						from an accredited physician or dietitian.
					</p>
					<h2>What is WFPBD?</h2>
					<p>
						A diet high in a diverse range of nutrient-dense plant foods and low
						in animal products or processed foods (such as oil, sugar, or
						refined grains).
					</p>
					<Emojis>
						<p>
							✔️ - 🥕🍅🥒🌿🍆🍄🥔🌱🥦🌾🥝🍓🍋🍈🍊🍍🍐🍇🍉🍌🍒🥑🍎🥜🌰🌶️🌽🍠🍵
						</p>
						<p>❌ - 🥩🥚🥛🧀🐖🐄🐔🦃🐟🦐</p>
						<p>❌ - 🍬🥐🍟🍦🥧🍺</p>
					</Emojis>
					{/* <img alt="WFPBD foods" src="/imgs/assets/foods/Fruits_Veg.jpg" /> */}
					<h2>Why eat this way?</h2>
					<p>
						<b>
							Disease is expensive, time consuming, miserable, and difficult.
							WFPBD is a powerful way to help avoid disease.
						</b>
					</p>
					<p>
						<b>WFPBD is also an ethical way to eat. </b> Animal agriculture is
						the #1 cause of antibiotic use, water use, water pollution, land
						use, native habitat destruction, plastic in the ocean, animal death,
						and global climate change.
					</p>
					<p>
						<b>It's also cheap and tastes great.</b>
					</p>
					<h2>How does it work?</h2>
					<ul>
						<li>
							Most Americans are{" "}
							{getLink(
								"https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/food-surveys-research-group/docs/wweia-usual-intake-data-tables/",
								"deficient in essential nutrients"
							)}{" "}
							that are common in a WFPB diet. Fixing these deficiencies can
							greatly improve overall health.
							<KeyValueTable
								// title="Percentage of Americans Defiicent In..."
								style={{ maxWidth: "350px", margin: "5px auto" }}
								keyLabel="Nutrient"
								valueLabel="Americans Deficient (%)"
								data={{
									Fiber: 97,
									Potassium: 97,
									"Vitamin E": 97,
									"Vitamin K": 73,
									Calcium: 70,
									Magnesium: 56,
									ALA: 44,
									"Vitamin C": 31
								}}
							/>
						</li>
						<li>
							<b>
								Trans fat, saturated fat, and to a lesser degree, dietary
								cholesterol are primarily found in animal tissue and play a
								strong role in artery and heart disease.
							</b>{" "}
							Plants do not contain trans fat nor cholesterol, and saturated fat
							is much less abundant. Plants also contain phytochemicals and
							phytosterols that may help prevent artery disease. Artery disease
							(Athleroscloris) may play a causal role in a variety of other
							diseases beyond heart disease.
						</li>
						<li>
							Poorly digested by our bodies,{" "}
							<b>
								whole plant foods are the only source of fiber and resistant
								starch (RS), which feed the "good" bacterial flora in our gut.
							</b>
							Without this protective flora, disease-causing molecules can enter
							more freely into our body. This "leaky gut syndrome" overactivates
							the immune system and may lead to chronic inflammation, autoimmune
							disease and cancer.
						</li>
						<li>
							<b>
								Fiber and resistant starch is filling (high satiety), and make
								it easier to stop over-eating.{" "}
							</b>
							In addition to being critical to health and very filling, they
							also provide little to no calories which helps prevent or reverse
							obesity.
						</li>
						<li>
							Cellular DNA can be damaged by Oxidative Stress, which can lead to
							cancer.{" "}
							<b>
								Antioxidants help prevent oxidative stress, and are bountiful in
								plants.
							</b>{" "}
							Antioxidants include vitamins and phytochemicals like Carotenoids
							and Flavonoids.
						</li>
						<li>
							Animal agriculture is the #1 user of antibiotics. It has even been
							caught using "last-resort" antibiotics.{" "}
							<b>
								Closely confined and medicated animals leads to the evolution of
								new and antibiotic-resistent disease, some of which can be
								spread to humans through air, food, or water contamination from
								waste ponds.
							</b>
						</li>
						<li>{getLink("/research", "And more...")}</li>
					</ul>
					<h2>How can I be sure of these benefits?</h2>
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
						{getLink("/endorsements", "endorse")} WFPBD.
					</p>
				</WidthWrapper>
			</div>
		);
	}
}
