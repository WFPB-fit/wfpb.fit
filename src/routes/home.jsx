import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {
	WidthWrapper,
	getLink,
	VerticalMidAlignWrapper
} from "../utils/GeneralUtils.jsx";

import styled from "styled-components";

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
						it is safe. Never be afraid of asking questions or getting a{" "}
						<a href="https://www.plantbaseddoctors.org">second opinion</a> from
						an accredited physician or dietitian.
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
						A pattern of eating that prioritizes nutrient-dense plant foods:
						vegetables, fruits, beans, legumes, grains, nuts, seeds, etc. And
						avoids animal products like meat, dairy, or eggs and processed foods
						like oil, sugar, white/refined flours, etc.
					</p>

					{/* <img alt="WFPBD foods" src="/imgs/assets/foods/Fruits_Veg.jpg" /> */}

					<h2>Why eat this way?</h2>

					<p>
						Whole plant foods are typically very high in vitamins, minerals,
						fiber, resistant starch, and phytochemicals like Carotenoids and
						Flavonoids. These nutrients are either essential for life or
						associated with positive heart, gut, or other health benefits.
					</p>

					<p>
						Plant foods are also <b>free of cholesterol and trans fats</b>,
						which naturally occur in animal products and may negatively impact
						heart health. Research supports plant-based foods as generally
						<b> anti-inflammatory and cancer preventative</b>, while animal
						products can be pro-inflammatory and cancer-promoting. Plant foods
						are the only
						<b> source of fiber and resistant starch</b>, which is important to
						intestinal health. Processed foods offer little nutrition for a
						large amount of calories, and can be difficult to put down.
					</p>

					<p>
						In addition to being extremely healthy, WFPBD is also an ethical way
						to eat. Animal agriculture is one of the biggest green house gas
						producers, and the number one cause of antibiotic use, water use,
						water pollution, plastic oceanic pollution, deforestation/land use,
						and biodiversity loss. It's also not fun for the animals themselves.
					</p>

					<h2>How can I be sure of these benefits?</h2>
					<p>
						For anything you want to believe, you can probably find research to
						support it. To actually make an <b>evidence-based decision</b>,
						there must be intelligently designed and honest research that is
						repeated until a reliable pattern emerges.
					</p>
					<p>
						Without expert training and a constant look into available research,
						it can be difficult to know what to believe. Professional
						organizations can summarize research in meta-analysis or research
						reports, but politics can pressure them into modifying their
						message. It's difficult to know what's true, and there's no easy
						answer.
					</p>
					<p>
						Despite these difficulties, we believe WFPBD has sufficient evidence
						to support it as a healthy way to eat and prevent disease. Decades
						of quality foundational research, ongoing modern analysis, and the
						endorsements of international governmental and non-governmental
						organizations supports this idea. This site attempts to aggregate
						much of this information, so that you can make a better informed
						decision about what to feed yourself and your family.
					</p>

					<h2>Potential Pitfalls</h2>
					<ol>
						<li>
							Created by bacteria, <b>vitamin B12</b> is stored in animal
							tissue. Without eating animals B12 will need to come from
							supplements or fortified food. Even without a strict vegetarian
							diet, it can be helpful to supplement because{" "}
							{getLink(
								"https://www.plantbaseddoctors.org/",
								"3% of US adults and 7% of seniors are B12 deficient, and 14-17% of adults are marginally depleted."
							)}
						</li>
						<li>
							Americans eat 2-3x more <b>protein</b> than they need. Excess
							protein can cause health problems. The USDA recommends 0.4 grams
							per pound of body weight every day. High protein plant foods
							include beans, peas, nuts, seeds, soy products, and whole grains.
							"Complementary proteins" are an outdated idea, and are not
							required.
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
							These can include your{" "}
							{getLink(
								"https://www.plantbaseddoctors.org/",
								"doctor or dietitian"
							)}, online communities, family, and friends.
						</li>
						<li>
							With a consistent change in eating habits,{" "}
							<b>
								{getLink("/research?selected=taste#food", "taste can change")}
							</b>{" "}
							in as little as 2 months.
						</li>
						<li>
							Eating low-calorie, nutritionally dense food may make you hungry
							more often. <b>Increase size/frequency of WFPB meals</b> to avoid
							grogginess while still maintaining your calorie goals.
						</li>
						<li>
							<b>Don't go grocery shopping when hungry,</b> as it may lead to{" "}
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
							Preparing ahead of time can lead to{" "}
							{getLink(
								"https://www.ncbi.nlm.nih.gov/pubmed/23597811",
								"healthier eating choices."
							)}
						</li>
						<li>
							<b>Reduce food waste</b> by{" "}
							{getLink(
								"/imgs/assets/foods/produce-chart.jpg",
								"properly storing produce"
							)}
							.
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
