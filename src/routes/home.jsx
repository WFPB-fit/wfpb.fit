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
						<b>whole food, low-fat, plant-based diet (WFPBD)</b>. WFPBD has been
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

					<Button
						onClick={this.props.toggleDrawer}
						variant="raised"
						color="primary"
					>
						Learn More
					</Button>

					<h2>What is WFPB Diet?</h2>

					<p>
						WFPB is somewhat similar to the
						{getLink(
							"https://www.hsph.harvard.edu/nutritionsource/healthy-weight/diet-reviews/mediterranean-diet/",
							"Mediterranean Diet"
						)}
						or the
						{getLink(
							"https://www.hsph.harvard.edu/nutritionsource/healthy-weight/diet-reviews/dash-diet/",
							"DASH Diet"
						)}
						. WFPBD is eating habits that prioritize a diverse range of
						nutrient-dense plant foods, and avoid animal products and processed
						foods.
					</p>
					<h3>What do you eat?</h3>
					<p>
						Nutrient dense plant foods include: vegetables, fruits, beans,
						legumes, whole grains, nuts, seeds, and more.
					</p>
					<p>
						Also, other plant-like foods such as fungi or algae are generally
						nutritious and can be eaten.
					</p>
					<p>
						Animal products are to be avoided and include meat, dairy, eggs,
						poultry, seafood, etc.
					</p>
					<p>
						Processed foods include sugar, refined grains, oil, candies, creams,
						etc.
					</p>
					<p>
						There are multiple food pyramids or infographics that show this
						diet, a few are below.
					</p>

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
							Disease is expensive, time consuming, miserable, and socially
							difficult.
						</b>{" "}
						Diet is a powerful way to avoid, or cause, many diseases.
					</p>

					<p>
						<b>WFPBD is also an ethical way to eat. </b> Animal agriculture is
						the #1 cause of antibiotic use, water use, water pollution, land
						use, native habitat destruction, plastic in the ocean, animal death,
						and is one of the biggest contributors to climate change.
					</p>

					<h2>How does it work?</h2>

					<ul>
						<li>
							<b>
								Cholesterol is absorbed from animals and gets caught in our
								arteries, eventually leading to Athleroscloris
							</b>
							. Athleroscloris can lead to heart disease and may play a role in
							other chronic diseases. Plants do not contain cholesterol. Plants
							contain phytosterols, which help reverse Athleroscloris.
						</li>
						<li>
							<b>
								Trans fat is found in animal meat and hydrogenated oils, and can
								contribute to heart disease.
							</b>{" "}
							Plants do not contain trans fat.
						</li>
						<li>
							Whole plants contains fiber and resistant starch (RS). Poorly
							digested by our bodies,{" "}
							<b>fiber and RS feed the good bacteria in our gut</b>. Good
							bacteria help feed and support our body's cells in the gut, and
							crowd out bad bacteria. By feeding the bad bacteria with animal
							products/processed foods, or{" "}
							<b>
								by not feeding the good bacteria enough, our gut can let
								disease-causing molecules into our body ("leaky gut syndrome").
							</b>{" "}
							This overactivates the immune system and can lead to inflammation,
							autoimmune disease, and cancer.
						</li>
						<li>
							<b>
								Fiber and resistant starch is filling, and make it easier to
								stop over-eating (increased satiety).{" "}
							</b>
						</li>
						<li>
							Cells and their DNA can be damaged by Oxidative Stress. This can
							lead to cancer and other diseases.{" "}
							<b>
								Antioxidants help prevent oxidative stress, and are bountiful in
								plants.
							</b>{" "}
							Antioxidants include vitamins and plant chemicals (phytochemicals)
							like Carotenoids and Flavonoids.
						</li>
						<li>
							<b>
								Animal products contain infectious disease causing organisms
								(pathogens).
							</b>{" "}
							Food safety ensures pathogens do not grow, but mistakes can lead
							to <b>food-borne illness.</b> Only when contaminated with animal
							waste do plants lead to food-borne illness.
						</li>
						<li>
							Animal agriculture is the #1 user of antibiotics, and even uses
							"last-resort" antibiotics.{" "}
							<b>
								Closely confined and medicated animals leads to the evolution of
								new diseases and antibiotic-resistent diseases.
							</b>
						</li>
						<li>And more...</li>
					</ul>

					<h2>How can I be sure of these benefits?</h2>
					<p>
						Without expert training and a constant look into available research,{" "}
						<b>it can be difficult to know what to believe. </b>
						Studies can be poorly or dishonestly designed. Meta analysis can
						summarize research, but bias and politics can warp their
						conclusions.
					</p>
					<p>
						<b>
							WFPBD has a large body of evidence to support it as a healthy way
							to eat.
						</b>{" "}
						Decades of diverse, quality research and the endorsements of
						governments and physician groups supports this idea.{" "}
						<b>This site aggregates info and research into WFPBD.</b>
					</p>

					<h2>Potential Nutrient Deficiencies</h2>
					<ol>
						<li>
							Created by bacteria, <b>vitamin B12</b> is stored in animal
							tissue. Without eating animals B12 will need to come from
							supplements or fortified food. Even without a strict WFPB
							diet, it can be helpful to supplement as
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
							food. Certain mushrooms, fortified plant-based milk, or algae
							supplements can be good sources of Vitamin D.
						</li>
					</ol>
					<h3>Other Nutrients To Consider</h3>
					<ol>
						<li>
							Americans eat about double the recommended amount of{" "}
							<b>protein</b>. Excess protein can cause bone mass loss, kidney or
							liver disease, and ..... The USDA recommends 0.4 grams per pound
							of body weight every day, but athletes or strict WFPB may
							need more. High protein plant foods include beans, peas, nuts,
							seeds, soy products, and whole grains. "Complementary proteins"
							are an outdated idea, and are not required.
						</li>
						<li>
							<b>Omega 3 fatty acids</b> have been shown to support a healthy
							lifestyle. Plants only make ALA. Your body can convert ALA to the
							more useful DHA+EPA, but only in small amounts. It can be good to
							supplement with DHA/EPA derived from algae, fulfilling your daily
							requirement while avoiding the environmental contamination found
							in fish.
						</li>
						<li>
							<b>Iron</b> is harder to absorb from plants (non-heme) than
							animals (heme). Eating a variety of plant foods including green
							leafy vegetables, beans, whole grains, and seeds will get you an
							adequate amount. Combining iron-rich plants with foods high in
							Vitamin C (like fruit or green leafy vegetables) can help
							absorption.
						</li>
					</ol>
					<h2>Getting Started Tips</h2>
					<ol>
						<li>
							<b>Everyone's body is different.</b> Reducing animal
							products/processed foods and increasing WFPB intake is generally
							associated with better health. However, allergies, food
							sensitivities, or digestion issues may make your individual diet
							look a little different.
						</li>
						<li>
							<b>Perfection is not required</b>. However, to get significant
							health benefits <b>long-term consistency is important</b>.
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
							Focusing on eating "good stuff" may be easier than trying to avoid
							"bad stuff".
							<b>
								Filling up on healthy whole foods makes it harder to crave
								unhealthy snacks.
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
							Eating low-calorie, nutritionally dense food may make you hungry
							more often. <b>Increase size/frequency of WFPB meals</b> to avoid
							grogginess while still maintaining your calorie goals.
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
						<li>
							<b>It gets easier</b> as you form new healthy habits.
						</li>
					</ol>
				</WidthWrapper>
			</div>
		);
	}
}
