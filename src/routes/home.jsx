import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {
	WidthWrapper,
	getLink,
	VerticalMidAlignWrapper
} from "../utils/GeneralUtils.jsx";

import styled from "styled-components";

import ModalImage from "../components/ModalImage";

const TallSkinnyImg = styled(ModalImage)`
	width: 60%;
	max-width: 400px;
	padding: 5px;
	margin: 0 auto;
	display: block;
	color: black;
`;
const SquarishImg = styled(ModalImage)`
	width: 70%;
	max-width: 800px;
	padding: 5px;
	margin: 0 auto;
	display: block;
`;

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

					<TallSkinnyImg
						src="/imgs/assets/foods/pyramids/gregor-daily-dozen.jpg"
						alt="Nutrition Facts Daily Dozen"
					/>
					<SquarishImg
						src="/imgs/assets/foods/pyramids/Plant-Based-Dietitian-Pyramid.jpg"
						alt="Plant-Based-Dietitian-Pyramid"
					/>

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
						<b>And it tastes great.</b>
					</p>

					<h2>How does it work?</h2>

					<ul>
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
						conclusions.
					</p>
					<p>
						<b>
							WFPBD has a large body of evidence to support it as a healthy way
							to eat.
						</b>{" "}
						Decades of diverse, quality {getLink("/research", "research")}{" "}
						support WFPBD. Governments, professional medical associations, and
						many thousands of regular people{" "}
						{getLink("/endorsements", "endorse")} WFPBD.
					</p>

					<h2>Potential Nutrient Deficiencies on WFPBD</h2>
					<ol>
						<li>
							Created by bacteria, <b>vitamin B12</b> is stored in animal
							tissue. Without eating animals B12 will need to be taken as a
							vitamin or eaten through fortified foods. B12 supplementation can
							be helpful even on regular diets, as
							{getLink(
								"https://www.plantbaseddoctors.org/",
								"3% of US adults and 7% of seniors are B12 deficient, and 14-17% of adults are marginally depleted."
							)}
						</li>
						<li>
							<b>Vitamin D</b> is created when our skin is exposed to sunlight.
							{getLink(
								"https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/",
								"5-30 minutes of daytime sunlight, twice a week fulfills our requirement for Vitamin D."
							)}
							When there's not enough sun, Vitamin D must be obtained through
							food, typically fish. Since WFPBD does not recommend animal
							products, instead use a D vitamin (cheap and effectve), fortified
							foods, algae supplements, or a UVB lamp to get your vitamin D.
						</li>
					</ol>
					<h3>Common Nutrition Concerns About WFPBD</h3>
					<p>
						Most people will get all other required nutrients when eating a
						diverse range of whole, plant-based foods. If you are worried about
						your nutrition try tracking it with{" "}
						{getLink("https://cronometer.com/", "Cronometer")}, a similar app,
						or discussing with your doctor.
					</p>

					<ol>
						<li>
							Americans eat twice the <b>protein</b> that's recommended.{" "}
							<b>
								Excess protein can weaken bones and plays a role in kidney,
								liver, heart disease and cancer.
							</b>{" "}
							The USDA's daily recommendation is 0.4 grams/pound of body weight.
							This can easily be met eating high protein plant foods such as
							beans, peas, nuts, seeds, soy products, and whole grains.{" "}
							<b>Complementary Proteins are an outdated idea</b>, as nearly any
							whole plant food will provide all needed amino acids when eating
							enough to fulfill your calorie needs.
						</li>
						<li>
							Current evidence does not support <b>Omega 3 fatty acid's</b> role
							in improving heart health, but it may be good for brain and joint
							health. There are 3 types. Plants only make ALA, which is an
							essential nutrient. We can convert a small percentage to DHA & EPA
							but eating more may be beneficial. Fish are the primary source of
							DHA+EPA, but typically have heavy pollutant contamination. Fish
							get their Omega 3s from algae, which can be eaten or supplemented
							directly as a cleaner source.
						</li>
						<li>
							<b>Iron</b> is harder to absorb from plants (non-heme) than
							animals (heme).{" "}
							<b>Eat a variety of plant foods to get all your iron</b>,
							particularly green leafy vegetables, beans, whole grains, and
							seeds.{" "}
							<b>Combine iron-rich plants with foods high in Vitamin C</b> (like
							fruit or green leafy vegetables) to help absorption.
						</li>
					</ol>
					<h2>Getting Started Tips</h2>
					<ol>
						<li>
							<b>Everyone's body is different.</b> Increasing WFPB intake and
							reducing animal products+processed foods is generally associated
							with better health. However, allergies, food sensitivities, or
							digestion issues may make your individual diet look a little
							different. Talk with a doctor or dietitian for help.
						</li>
						<li>
							<b>
								Perfection is not required, but "moderation in everything" is
								not necessarily healthier.
							</b>{" "}
							For example, the very similar{" "}
							{getLink(
								"https://www.hsph.harvard.edu/nutritionsource/healthy-weight/diet-reviews/mediterranean-diet/",
								"Mediterranean"
							)}
							or
							{getLink(
								"https://www.hsph.harvard.edu/nutritionsource/healthy-weight/diet-reviews/dash-diet/",
								"DASH"
							)}{" "}
							diets have been shown to have very good health outcomes, with
							amazingly huge improvements over a typical westerner's health and
							diet. But when directly tested against WFPBD, WFPBD typically
							produces even better health outcomes.
						</li>
						<li>
							<b>
								Support groups can help you make <i>permanent</i> change.
							</b>{" "}
							These can include your
							{getLink(
								"https://www.plantbaseddoctors.org/",
								"doctor or dietitian"
							)}
							, online communities, family, and friends.
						</li>
						<li>
							<b>
								Filling up on healthy, whole, plant-based foods first makes it
								less likely to over-indulge in unhealthy snacks.
							</b>
						</li>
						<li>
							With a consistent change in eating habits,
							<b>
								{getLink("/research?selected=taste#food", "taste can change")}
							</b>
							in as little as 2 months.
						</li>
						<li>
							<b>
								Eating a nutrient-dense WFPBD may make it necessary to increase the
								volume, amount, or frequency of food eaten to maintain your calorie
								intake.
							</b>
						</li>
						<li>
							<b>Don't go grocery shopping when hungry,</b> as it may lead to
							{getLink(
								"/research?selected=shopping#food",
								"buying more junk food."
							)}
						</li>
						{/* <li>
							Limiting food purchases to the grocery store can be helpful, as it limits
							the number of times to exert willpower.
						</li> */}
						<li>
							<b>Buy and prepare food in bulk</b> to save time and money.
							Preparing ahead of time can lead to
							{getLink(
								"https://www.ncbi.nlm.nih.gov/pubmed/23597811",
								"healthier eating choices."
							)}
						</li>
						<li>
							<b>Reduce food waste</b> by
							{getLink(
								"/imgs/assets/foods/produce-chart.jpg",
								"properly storing produce."
							)}
						</li>
					</ol>
				</WidthWrapper>
			</div>
		);
	}
}
