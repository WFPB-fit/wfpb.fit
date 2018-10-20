import React, { Component } from "react";

import styled from "styled-components";

import { WidthWrapper, getLink } from "../utils/GeneralUtils.jsx";

import ModalImage from "../components/ModalImage";
import KeyValueTable from "../components/keyValueTable";

import QuickResources from "../assets/data/quick-resources.json";
import Heading from "../components/heading";

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
				<Heading id="what" txt="What to eat?" variant="h2" />
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
				<Heading id="learn" txt="Where can I learn more?" variant="h2" />
				<p>
					See the {getLink("/research", "research")} page or start looking
					through {getLink("https://scholar.google.com/", "Google Scholar")} for
					scientific sources.
				</p>
				<Heading id="online-ed" txt="Online Education" variant="h3" />
				<p>For summaries and explanation of complex nutritional science:</p>
				{HowTo.getListed(QuickResources.sites)}
				<Heading id="books" txt="Books" variant="h3" />
				<p>
					These popular books provide overviews of how and why WFPB works so
					well. More books can be found on the{" "}
					{getLink("/endorsements", "endorsements")} page.{" "}
				</p>
				{HowTo.getListed(QuickResources.books)}
				<Heading id="help" txt="Where can I get help?" variant="h2" />
				<Heading id="communities" txt="Communities" variant="h3" />
				Online forums are a great place for advice, questions, discussion, and
				motivation.
				{HowTo.getListed(QuickResources.communities)}
				<Heading id="programs" txt="Programs" variant="h3" />
				Multi-week programs with strong evidence-based results can guide you
				through the process, but may cost a few hundred dollars.
				{HowTo.getListed(QuickResources.programs)}
				<Heading id="recipes" txt="What's for dinner?" variant="h2" />
				Whether you need cheap, fast, and easy or delicious and decadent there's
				a WFPB recipe waiting for you.
				{HowTo.getListed(QuickResources.recipes)}
				<Heading id="tips" txt="Getting Started Tips" variant="h2" />
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
				<Heading id="how" txt="How does it work?" variant="h2" />
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
						A small number of nutrients may be{" "}
						{getLink("/how-to#potential-issues", "less common", true)} in WFPBD
						though, so plan your diet well to ensure proper nutrition.
						{/* Nutrients that are {getLink("/how-to#potential-issues","less common",true)} in WFPBD are less likely to
							have deficiencies.
							<KeyValueTable
								// title="Percentage of Americans Defiicent In..."
								style={{ maxWidth: "350px", margin: "5px auto" }}
								keyLabel="Nutrient"
								valueLabel="Americans Deficient (%)"
								data={{
									"Vitamin D": 69,
									Zinc: 12,
									Iron: 5,
									Protein: 3,
									B12: 3
								}}
							/> */}
					</li>
					<li>
						<b>
							Trans fat, saturated fat, and to a lesser degree, dietary
							cholesterol are primarily found in animal tissue and play a strong
							role in artery and heart disease.
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
							Fiber and resistant starch is filling (high satiety), and make it
							easier to stop over-eating.{" "}
						</b>
						In addition to being critical to health and very filling, they also
						provide little to no calories which helps prevent or reverse
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
							new and antibiotic-resistent disease, some of which can be spread
							to humans through air, food, or water contamination from waste
							ponds.
						</b>
					</li>
					<li>{getLink("/research", "And more...")}</li>
				</ul>
				<Heading
					id="potential-issues"
					txt="Potential Issues"
					variant="h2"
				/>
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
				<Heading
					id="common-concerns"
					txt="Common Concerns"
					variant="h3"
				/>
				<p>
					Most people will get all other required nutrients when eating a
					diverse range of whole, plant-based foods. If you are worried about
					your nutrition try tracking it with{" "}
					{getLink("https://cronometer.com/", "Cronometer,")} a similar app,
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
