import React, { Component } from "react";

import styled from "styled-components";

import { WidthWrapper, getLink } from "../utils/GeneralUtils.jsx";

import ModalImage from "../components/ModalImage";
// import KeyValueTable from "../components/keyValueTable";

import QuickResources from "../assets/data/quick-resources.json";
import Heading from "../components/heading";

import Typography from "@material-ui/core/Typography";

const TallSkinnyImg = styled(ModalImage)`
	width: 60%;
	max-width: 400px;
	padding: 5px;
	margin: 0 auto;
	display: block;
	color: black;
`;

// const SquarishImg = styled(ModalImage)`
// 	width: 70%;
// 	max-width: 800px;
// 	padding: 5px;
// 	margin: 0 auto;
// 	display: block;
// `;

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
				<Heading id="what" txt="What to eat?" variant="h4" />
				<Typography>
					Diverse, whole, plant based foods that meet all nutritional needs
					might look like:{" "}
				</Typography>
				<TallSkinnyImg
					src="/imgs/assets/foods/pyramids/gregor-daily-dozen.jpg"
					alt="Nutrition Facts Daily Dozen"
				/>
				{/* <SquarishImg
					src="/imgs/assets/foods/pyramids/Plant-Based-Dietitian-Pyramid.jpg"
					alt="Plant-Based-Dietitian-Pyramid"
				/> */}
				{/* <SquarishImg
					src="/imgs/assets/foods/pyramids/lowfat_highcarb_wfpb_food_pyramid_nutriciously.jpg"
					alt="Nutriciously WFPB low fat food pyramid"
				/>
				<SquarishImg
					src="/imgs/assets/foods/pyramids/vegan_food_pyramid_by_nutriciously7.jpg"
					alt="Nutriciously WFPB low fat food pyramid"
				/> */}
				<Heading id="help" txt="Where can I get help?" variant="h4" />
				<Heading id="doctors" txt="Doctors" variant="h5" />
				Find a medical professional to help you on your journey.
				{HowTo.getListed(QuickResources.doctors)}
				<Heading id="communities" txt="Communities" variant="h5" />
				Online forums are a great place for advice, questions, discussion, and
				motivation.
				{HowTo.getListed(QuickResources.communities)}
				<Heading id="programs" txt="Programs" variant="h5" />
				Structured programs can guide you through the transition. Some cost
				money, some are free.
				{HowTo.getListed(QuickResources.programs)}
				<Heading id="learn" txt="Where can I learn more?" variant="h4" />
				<Typography>
					See the {getLink("/research", "research")} page or start looking
					through {getLink("https://scholar.google.com/", "Google Scholar")} for
					scientific sources.
				</Typography>
				<Heading id="online-ed" txt="Online Education" variant="h5" />
				<Typography>For summaries and explanation of complex nutritional science:</Typography>
				{HowTo.getListed(QuickResources.sites)}
				<Heading id="books" txt="Books" variant="h5" />
				<Typography>
					These popular books provide overviews of how and why WFPB works so
					well. More books can be found on the{" "}
					{getLink("/endorsements#orgs", "endorsements")} page.{" "}
				</Typography>
				{HowTo.getListed(QuickResources.books)}
				<Heading id="recipes" txt="What's for dinner?" variant="h4" />
				Whether you need cheap, fast, and easy or delicious and decadent there's
				a WFPB recipe waiting for you. Also see the "Books" section for recipe
				books.
				{HowTo.getListed(QuickResources.recipes)}
				<Heading id="tips" txt="Getting Started Tips" variant="h4" />
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
						diet. But when{" "}
						{getLink(
							"/research?selected=DASH_mediterranean_moderation_vegan_WFPB_vegetarian#food",
							"direct tested against WFPB"
						)}{" "}
						, WFPBD typically produces even better health outcomes.
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
			</WidthWrapper>
		);
	}
}
