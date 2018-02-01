import React, { Component } from 'react';

import Typography from 'material-ui/Typography/Typography';

import { WidthWrapper } from '../utils/GeneralUtils.jsx';
import ImageDangleText from '../components/imageDangleText';
import CenteredTextImage from '../components/centeredTextImage';

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

export default class Home extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		// this.props.openNav();
		return (
			<div>
				<CenteredTextImage
					title="Diet Quick Ref"
					subtitle="Healthy Eating, Simplified"
					height="600px"
					src="/imgs/assets/veges2_.jpg"
				/>
				<Row2>
					<Typography type="headline">
						Fast, Evidence-Based Nutrition Information
					</Typography>
				</Row2>
				<WidthWrapper>
					<ImagesRow>
						<ImageDangleText
							src="/imgs/assets/veges2_.jpg"
							text="asd"
						/>
						<ImageDangleText
							src="/imgs/assets/veges2_.jpg"
							text="asd"
						/>
						<ImageDangleText
							src="/imgs/assets/veges2_.jpg"
							text="asd"
						/>
					</ImagesRow>
				</WidthWrapper>

				{/* https://www.cdc.gov/nchs/data/databriefs/db288.pdf - https://wwwn.cdc.gov/nchs/nhanes/continuousnhanes/default.aspx?BeginYear=2015
                https://www.cdc.gov/nchs/fastats/leading-causes-of-death.htm */}
				{/* <Typography>
							Chronic disease is a growing plague on the western world.

					</Typography> */}

			</div>
		);
	}
}
