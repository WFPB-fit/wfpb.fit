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
	color:black;
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
						</b>, and more.
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
						Eating habits that prioritize a diverse range of nutrient-dense
						plant foods, and avoid animal products and processed foods.
					</p>

					<p>
						WFPB is similar to the
						{getLink(
							"https://www.hsph.harvard.edu/nutritionsource/healthy-weight/diet-reviews/mediterranean-diet/",
							"Mediterranean Diet"
						)}
						and the
						{getLink(
							"https://www.hsph.harvard.edu/nutritionsource/healthy-weight/diet-reviews/dash-diet/",
							"DASH Diet"
						)}
						with its focus on plants like vegetables, fruits, beans, legumes,
						grains, nuts, seeds, mushrooms etc. It differs by recommending
						against animal products like dairy, eggs, meat, poultry, or seafood.
						Processed foods like sugar, white flours, and even oil should also
						be minimized. Some sample food pyramids are below.
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
						WFPB gives us a way to take control of our health and help avoid
						many different types of disease. It works in a variety of ways:
					</p>

					<ul>
						<li>
							<b>
								Cholesterol is absorbed from animals and gets caught in our
								arteries (Athleroscloris)
							</b>. Athleroscloris can lead to heart disease and may play a role
							in other chronic diseases. Plants do not contain cholesterol.
							Plants contain phytosterols, which help reverse Athleroscloris.
						</li>
						<li>
							<b>
								Trans fat is found in animal meat and some oils, and can
								contribute to heart disease.
							</b>{" "}
							Plants do not contain trans fat.
						</li>
						<li>
							Whole plants contains fiber and resistant starch (RS). Poorly
							digested by our bodies,{" "}
							<b>fiber and RS feed the good bacteria in our gut</b>. Good
							bacteria help feed and support our body's cells in the gut. By
							feeding the bad bacteria with animal products/processed foods, or{" "}
							<b>
								by not feeding the good bacteria enough, our gut can let in more
								disease-causing molecules ("leaky gut syndrome").
							</b>{" "}
							This overactivates the immune system and can lead to inflammation
							and autoimmune disease.
						</li>
						<li>
							<b>
								Fiber and resistant starch is filling, and make it easier to
								stop over-eating.{" "}
							</b>
						</li>
						<li>
							Oxidative stress is the process of oxygen molecules reacting with
							the DNA in our cells. These reactions can lead to mutations and
							cancer.{" "}
							<b>
								Antioxidants help prevent oxidative stress, and are bountiful in
								plants.
							</b>{" "}
							Antioxidants include vitamins and plant chemicals (phytochemicals)
							like Carotenoids (plant pigments) and Flavonoids.
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
							Evidence suggests{" "}
							<b>
								long-term exposure to small amounts of animal pathogens may lead
								to certain chronic disease.
							</b>
						</li>
						<li>
							Animal agriculture is the #1 user of antibiotics, and even uses
							"last-resort" antibiotics.{" "}
							<b>
								Closely confined and medicated animals leads to the evolution of
								new diseases and antibiotic-resistent diseases.
							</b>
						</li>
					</ul>

					<p>
						<b>WFPBD is also an ethical way to eat. </b> Animal agriculture is
						one of the biggest contributors to climate change and the #1 cause
						of water use, land use, water pollution, animal death,
						deforestation, and plastic in the ocean.
					</p>

					<h2>How can I be sure of these benefits?</h2>
					<p>
						Without expert training and a constant look into available research,
						it can be difficult to know what to believe. Studies can be poorly
						or dishonestly designed. Professional organizations can summarize
						research, but bias and politics can warp their conclusions.
					</p>
					<p>
						Despite these difficulties, we believe WFPBD has sufficient evidence
						to support it as a healthy way to eat and prevent disease. Decades
						of quality foundational research, ongoing modern analysis, and the
						endorsements of international governmental and non-governmental
						organizations supports this idea. This site attempts to aggregate
						this info, so that you can be better informed about this healthy way
						of eating.
					</p>

					<h2>Potential Pitfalls</h2>
					<ol>
						<li>
							Created by bacteria, <b>vitamin B12</b> is stored in animal
							tissue. Without eating animals B12 will need to come from
							supplements or fortified food. Even without a strict vegetarian
							diet, it can be helpful to supplement as
							{getLink(
								"https://www.plantbaseddoctors.org/",
								"3% of US adults and 7% of seniors are B12 deficient, and 14-17% of adults are marginally depleted."
							)}
						</li>
						<li>
							Americans eat about double the recommended amount of{" "}
							<b>protein</b>. Excess protein can cause bone mass loss, kidney or
							liver disease, and ..... The USDA recommends 0.4 grams per pound
							of body weight every day, but athletes or strict vegetarians may
							need more. High protein plant foods include beans, peas, nuts,
							seeds, soy products, and whole grains. "Complementary proteins"
							are an outdated idea, and are not required.
						</li>
						<li>
							<b>Vitamin D</b> is created when our skin is exposed to sunlight.
							10-20 minutes in the sun, 3 times a week makes enough. When
							there's not enough sun, Vitamin D must be obtained through food,
							typically fish or fortified foods. Vitamin or algae supplements
							are another good source (algae are where fish Vitamin D).
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
							)}, online communities, family, and friends.
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
