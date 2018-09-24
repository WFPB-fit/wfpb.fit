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

					<h2>What is WFPB Diet?</h2>

					<p>
						WFPBD is a pattern of eating habits that prioritize a diverse range
						of nutrient-dense plant foods, and avoid animal products and
						processed foods. WFPB is somewhat similar to the
						{getLink(
							"https://www.hsph.harvard.edu/nutritionsource/healthy-weight/diet-reviews/mediterranean-diet/",
							"Mediterranean Diet"
						)}
						or the
						{getLink(
							"https://www.hsph.harvard.edu/nutritionsource/healthy-weight/diet-reviews/dash-diet/",
							"DASH Diet"
						)}
						.
					</p>
					<h3>What do you eat?</h3>
					<p>
						Nutrient dense plant foods include: vegetables, fruits, beans,
						legumes, whole grains, nuts, seeds, even fungi or algae, and more.
					</p>
					<p>
						Animal products are to be avoided and include meat, dairy, eggs,
						poultry, fish, and shellfish.
					</p>
					<p>
						Processed foods include sugar, oil, refined grains, candies, creams,
						etc.
					</p>

					<h3>Example Diet</h3>

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
						</b>{" "}
						WFPBD is a powerful way to help avoid disease.
					</p>

					<p>
						<b>WFPBD is also an ethical way to eat. </b> Animal agriculture is
						the #1 cause of antibiotic use, water use, water pollution, land
						use, native habitat destruction, plastic in the ocean, animal death,
						and global climate change.
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
								new and antibiotic-resistent disease, some of which can be
								spread to humans.
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
						governments and physician groups support WFPBD.{" "}
						<b>This site aggregates info and research into WFPBD.</b>
					</p>

					<h2>Potential Nutrient Deficiencies</h2>
					<ol>
						<li>
							Created by bacteria, <b>vitamin B12</b> is stored in animal
							tissue. Without eating animals B12 will need to be taken as a
							vitamin or eaten through fortified foods. Even without a strict
							WFPB diet, B12 supplementation can be helpful, as
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
					<h3>Other Nutrients To Consider</h3>
					<ol>
						<li>
							Americans eat twice the <b>protein</b> that's recommended.{" "}
							<b>Excess protein can cause disease</b>: weakened bones, kidney or
							liver disease, and increased risk of heart disease and cancer. The{" "}
							<b>
								USDA recommends daily intake of 0.4 grams/pound of body weight.
							</b>{" "}
							High protein plant foods include beans, peas, nuts, seeds, soy
							products, and whole grains.{" "}
							<b>Complementary Proteins are an outdated idea</b>, as nearly any
							whole plant food can fulfill essential amino acid requirements.
						</li>
						<li>
							<b>Omega 3 fatty acids</b> have been shown to improve brain and
							joint health. There are 3 types: ALA, DHA, and EPA. Plants only
							make ALA. Your body can convert ALA to the more useful DHA+EPA,
							but only in small amounts.{" "}
							<b>
								It can be good to supplement with DHA/EPA derived from algae
							</b>
							, fulfilling your daily requirement while avoiding the
							environmental contamination found in fish.
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
							<b>Everyone's body is different.</b> Reducing animal
							products/processed foods and increasing WFPB intake is generally
							associated with better health. However, allergies, food
							sensitivities, or digestion issues may make your individual diet
							look a little different. Talk with a doctor or dietitian for help.
						</li>
						<li>
							<b>Perfection is not required</b>. However, to get significant
							health benefits <b>long-term consistency is</b>.
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
							"bad stuff".{" "}
							<b>
								Filling up on healthy whole foods makes it less likely to
								over-indulge in unhealthy snacks.
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
							Eating low-calorie, nutritionally dense food may make you
							calorie-deficient without realizing it.{" "}
							<b>
								You may need to increase the size/frequency of WFPB meals to
								maintain your energy (calorie) intake.
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
