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

					<h2>Issues With WFPBD and How To Avoid Them</h2>
					<ol>
						<li>
							40% of the US is deficient in <b>vitamin B12</b>. Created by
							bacteria, B12 is stored in animal tissue. If you completely avoid
							animal products you'll need to take a supplement or eat fortified
							foods.
						</li>
					</ol>
					<h2>Getting Started Tips</h2>
					<ol>
						<li>
							<b>This is not a quick weight-loss scheme.</b> This is a pattern
							of healthy eating that relies on consistent choices (but not
							perfection).
						</li>
						<li>
							<b>
								Support groups can help you make <i>permanent</i> change.
							</b>{" "}
							These can include your{" "}
							{getLink(
								"https://www.plantbaseddoctors.org/",
								"doctor or dietitian"
							)}, online communities, family, friends and meeting new people at
							meetups/plant-based festivals.
						</li>
						<li>
							With a consistent change in eating habits,{" "}
							<b>
								your {getLink("/research?selected=taste#food", "taste")}{" "}
								preferences will change.
							</b>{" "}
							This typically takes about 2 months.
						</li>
						<li>
							While transitioning away from high calorie foods like oil, sugar,
							and animal products{" "}
							<b>you may need to eat larger meals and more often</b> in order to
							get enough calories (but only if you're actually eating the right
							foods).
						</li>
						<li>
							<b>Don't go grocery shopping when hungry,</b> as it may lead to{" "}
							{getLink(
								"/research?selected=shopping#food",
								"buying more junk food."
							)}
						</li>
						<li>
							Reducing the amount of times you eat at restaurants and limiting
							food purchases only to the grocery store can be helpful for some
							people, as it limits the amount of times you need to exert
							willpower.
						</li>
						<li><b>It gets easier over time</b> as new healthy habits are formed.</li>
					</ol>

					<h2>FAQ</h2>
					<ol>
						<li>
							While transitioning away from high calorie foods like oil, sugar,
							and animal products you may find yourself needing to larger meals
							and more often in order to get enough calories.
						</li>
					</ol>
				</WidthWrapper>
			</div>
		);
	}
}
