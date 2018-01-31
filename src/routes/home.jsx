import React, { Component } from 'react';
import Typography from 'material-ui/Typography/Typography';

import { WidthWrapper } from '../utils/GeneralUtils.jsx';
import CenteredTextImage from '../components/centeredTextImage';
import ImageTextRow from '../components/imageTextRow';

import Grid from 'material-ui/Grid';

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
				<WidthWrapper>

					<Typography type="display1">
					Fast, Simple, Evidence-Based Nutrition Advice
					</Typography>

					{/* https://www.cdc.gov/nchs/data/databriefs/db288.pdf - https://wwwn.cdc.gov/nchs/nhanes/continuousnhanes/default.aspx?BeginYear=2015
                https://www.cdc.gov/nchs/fastats/leading-causes-of-death.htm */}
					{/* <Typography>
							Chronic disease is a growing plague on the western world.

					</Typography> */}
										<ImageTextRow />

				</WidthWrapper>
			</div>
		);
	}
}
