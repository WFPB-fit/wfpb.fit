import React, { Component } from 'react';

import Typography from 'material-ui/Typography/Typography';
import Button from 'material-ui/Button';

import { WidthWrapper, getLink, VerticalMidAlignWrapper } from '../utils/GeneralUtils.jsx';
import ImageDangleText from '../components/imageDangleText';
import CenteredTextImage from '../components/centeredtextImage';

import styled from 'styled-components';

const Row2 = styled.div`
padding:40px;
background-color:#ccc;
color:black;
text-align:center;
`;

const ImagesRow = styled.div`
display:block;

@media (min-width: 800px) {
	display:flex;
	justify-content: space-around;
}
`;
const White = styled.div`
color:white;
margin:5px;
`;
const BottomWrap = styled.div`
display:flex;
justify-content: space-around;
`;
const BottomText = styled.div`
width:100%;
padding-left: 70px;
`;
const BottomImg = styled.img`
height:120px;
width:120px;
`
export default class Home extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		// this.props.openNav();
		return (
			<div>
				<CenteredTextImage
					height="600px"
					src="/imgs/assets/filler/veges.jpg" // https://commons.wikimedia.org/wiki/File:Fruit_%26_vegs_assortment.jpg
				>

					<Typography type='display3' align="center">
						<White>
							Diet Quick Ref
						</White>
					</Typography>

					<Typography type='subheading' align="center">
						<White>
							Healthy Eating, Simplified
						</White>

						<Button
							onClick={this.props.openNav}
							raised
							color="primary"
						>
							Get Started
						</Button>
					</Typography>
				</CenteredTextImage>

				<Row2>
					<Typography type="headline">
						Fast, Free, Evidence-Based Nutrition Advice
					</Typography>
				</Row2>

				<WidthWrapper>

					<ImagesRow>
						<ImageDangleText
							src="/imgs/assets/icons/health.png"
							text={
								<ul>
									<li>Lower risk of death</li>
									<li>Treat chronic disease</li>
									<li>Enhance fitness</li>
									<li>Prevent pain</li>
								</ul>
							}
						/>
						<ImageDangleText
							src="/imgs/assets/icons/mental-health.png"
							text={
								<ul>
									<li>Look good</li>
									<li>Feel great</li>
									<li>Improve energy</li>
									<li>Take control of your health</li>
								</ul>
							}
						/>
						<ImageDangleText
							src="/imgs/assets/icons/burger.png"
							text={
								<ul>
									<li>Delicious Food</li>
									<li>Simple Recipes</li>
								</ul>
							}
						/>
					</ImagesRow>

					<ImagesRow>
						<ImageDangleText
							src="/imgs/assets/icons/microscope.png"
							text={
								<span>
									Peer-reviewed {getLink("/research", "research")} to kick-start your nutrition learning experience.
									Become better informed at the supermarket and when talking with your doctor.
								</span>
							}
						/>
						<ImageDangleText
							src="/imgs/assets/icons/hdd.png"
							text={
								<span>
									{getLink("/food", "Data")} from thousands of foods for easy nutrition comparison.
									Negative externality data gives overview of environmental impact of food production.
								</span>
							}
						/>
						<ImageDangleText
							src="/imgs/assets/icons/piggy-bank.png"
							text={
								<span>
									We find the best deals online, so that eating healthy doesn't have to break the bank.
								</span>
							}
						/>
					</ImagesRow>

				</WidthWrapper>

				<CenteredTextImage
					height="400px"
					src="/imgs/assets/filler/vegesNCI.jpg" // https://commons.wikimedia.org/wiki/File:Fruit_%26_vegs_assortment.jpg
				>
					<BottomWrap>
						<VerticalMidAlignWrapper>
							<BottomImg
								src="/imgs/assets/icons/berry.png" />
						</VerticalMidAlignWrapper>

						<BottomText>
							<Typography type="display1"><White>Fix Your Health Now</White></Typography>
								<White>
								Diet is vitally important part of a healthy life, and is often overlooked and misunderstood.
								Fads can make you lose weight, but day-to-day eating habits will keep you healthy long-term.
								Click above to start learning how.
									{/* Diet is vitally important part of a healthy life, and is often overlooked and misunderstood.
									While fad diets can help you lose weight, day-to-day eating habits will keep you healthy long-term.
									Healthy eating isn't just for the overweight though.
									The right food can have major health impacts: reversing heart disease, treating and preventing chronic disease, decreasing cancer risk, easier bowel movements, enhancing athletic performance, clearing complexion, and much more.
									Begin your nutrition journey with Diet Quick Ref, and talk to your doctor about how a healthy diet can improve your life. */}
								</White>
						</BottomText>
					</BottomWrap>
				</CenteredTextImage>

				{/* https://www.cdc.gov/nchs/data/databriefs/db288.pdf - https://wwwn.cdc.gov/nchs/nhanes/continuousnhanes/default.aspx?BeginYear=2015
                https://www.cdc.gov/nchs/fastats/leading-causes-of-death.htm */}
				{/* <Typography>
							Chronic disease is a growing plague on the western world.

					</Typography> */}

			</div >
		);
	}
}
