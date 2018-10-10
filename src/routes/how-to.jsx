import React, { Component } from "react";

import styled from "styled-components";

import KeyValueTable from "../components/keyValueTable";
import { WidthWrapper, getLink } from "../utils/GeneralUtils.jsx";

import ModalImage from "../components/ModalImage";

import QuickResources from "../assets/data/quick-resources.json";

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

export default class HowTo extends Component {
	constructor(props) {
		super(props);
	}
	static getListed(data) {
		return (
			<ul>
				{data.map(x => {
					return <li key={x.url}>{getLink(x.url, x.name)}</li>;
				})}
			</ul>
		);
	}
	render() {
		return (
			<WidthWrapper>
				<h2>What to eat?</h2>
				<p>
					Diverse, whole, plant based foods that meet all nutritional needs
					might look like:{" "}
				</p>
				<TallSkinnyImg
					src="/imgs/assets/foods/pyramids/gregor-daily-dozen.jpg"
					alt="Nutrition Facts Daily Dozen"
				/>
				<SquarishImg
					src="/imgs/assets/foods/pyramids/Plant-Based-Dietitian-Pyramid.jpg"
					alt="Plant-Based-Dietitian-Pyramid"
				/>
				<h2>Where can I learn more?</h2>
				<p>
					See the {getLink("/research", "research")} page or start looking
					through {getLink("https://scholar.google.com/", "Google Scholar")} for
					scientific sources.
				</p>
				<h3>Online Education</h3>
				<p>For summaries and explanation of complex nutritional science:</p>
				{HowTo.getListed(QuickResources.sites)}
				<h3>Books</h3>
				<p>
					These popular books provide overviews of how and why WFPB works so
					well. More books can be found on the{" "}
					{getLink("/endorsements", "endorsements")} page.{" "}
				</p>
				{HowTo.getListed(QuickResources.books)}
				<h2>Where can I get help?</h2>
				<h3>Communities</h3>
				Online forums are a great place for advice, questions, discussion, and
				motivation.
				{HowTo.getListed(QuickResources.communities)}
				<h3>Programs</h3>
				Multi-week programs with strong evidence-based results can guide you
				through the process, but may cost a few hundred dollars.
				{HowTo.getListed(QuickResources.programs)}
				<h2>What's for dinner?</h2>
				Whether you need cheap, fast, and easy or delicious and decadent there's
				a WFPB recipe waiting for you.
				{HowTo.getListed(QuickResources.recipes)}
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
							Perfection is not required, but "moderation in everything" is not
							necessarily healthier.
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
							Eating a nutrient-dense WFPBD may make it necessary to increase
							the volume, amount, or frequency of food eaten to maintain your
							calorie intake.
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
						{getLink("/research?selected=prep", "healthier eating choices.")}
					</li>
					<li>
						<b>Reduce food waste</b> by
						{getLink(
							"/imgs/assets/foods/produce-chart.jpg",
							"properly storing produce."
						)}
					</li>
				</ol>
				<h2 id="issues">Potential Nutrient Deficiencies on WFPBD</h2>
				The following nutrients might be harder to get on WFPBD.
				<ol>
					<li>
						Created by bacteria, <b>vitamin B12</b> is stored in animal tissue.
						Without eating animals B12 will need to be taken as a vitamin or
						eaten through fortified foods. B12 supplementation can be helpful
						even on regular diets, as
						{getLink(
							"https://www.plantbaseddoctors.org/",
							"3% are deficient, 7% of seniors, and 14-17% of adults are marginally depleted."
						)}
					</li>
					<li>
						<b>Vitamin D</b> is created when our skin is exposed to sunlight.
						{getLink(
							"https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/",
							"5-30 minutes of daytime sunlight, twice a week fulfills our requirement for Vitamin D."
						)}
						When there's not enough sun, Vitamin D can be obtained through a
						multi-vitamin (cheap and effectve), fortified foods, algae
						supplements, or a special UVB lamp.
					</li>
				</ol>
				<h3>Common Concerns About WFPBD</h3>
				<p>
					Most people will get all other required nutrients when eating a
					diverse range of whole, plant-based foods. If you are worried about
					your nutrition try tracking it with{" "}
					{getLink("https://cronometer.com/", "Cronometer")}, a similar app,
					discussing with your doctor, or getting a blood test.
				</p>
				<ol>
					<li>
						Americans eat twice the <b>protein</b> that's recommended.{" "}
						<b>
							Excess protein can weaken bones and plays a role in kidney, liver,
							heart disease and cancer.
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
						DHA+EPA, but typically have heavy pollutant contamination. Fish get
						their Omega 3s from algae, which can be eaten or supplemented
						directly as a cleaner source.
					</li>
					<li>
						<b>Iron, Calcium, and Zinc</b> are common concerns but deficiencies
						are rare with WFPBD. Eating diverse, fresh plant foods will ensure
						you get more than enough, particularly leafy greens, beans, and
						seeds are great sources.
					</li>
				</ol>
			</WidthWrapper>
		);
	}
}
