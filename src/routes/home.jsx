import React, { Component } from 'react';
import Typography from 'material-ui/Typography/Typography';

import { WidthWrapper } from '../utils/GeneralUtils.jsx';
import CenteredTextImage from '../components/centeredTextImage';


export default class Home extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<CenteredTextImage
					title="What's For Lunch?"
					src="/imgs/assets/veges2_.jpg"
				/>
				<WidthWrapper>
					<Typography>We</Typography>

					<Typography type='display1'>How sick are we?</Typography>

					{/* https://www.cdc.gov/nchs/data/databriefs/db288.pdf - https://wwwn.cdc.gov/nchs/nhanes/continuousnhanes/default.aspx?BeginYear=2015
                https://www.cdc.gov/nchs/fastats/leading-causes-of-death.htm */}
					<Typography>
						Chronic disease is a growing plague on the western world.

					</Typography>
				</WidthWrapper>
			</div>
		);
	}
}
