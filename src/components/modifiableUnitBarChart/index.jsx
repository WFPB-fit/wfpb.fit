import React, { Component } from "react";

import MenuItem from "@material-ui/core/MenuItem";
import SelectField from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { VictoryChart, VictoryTheme, VictoryBar, VictoryAxis } from "victory";

import styled from "styled-components";

import { titleize } from "../../utils/GeneralUtils";
import numeral from "numeral";

const GraphDiv = styled.div`
	display: block;
	@media (min-width: 700px) {
		width: 550px;
		display: inline-block;
	}
`;
const GraphCenterer = styled.div`
	display: block;
	@media (min-width: 700px) {
		display: flex;
		align-items: center;
	}
`;
const CenteredForm = styled(FormControl)`
	transform: translateY(-50%);

	display: block;
	@media (min-width: 700px) {
		display: inline-block;
	}
`;
const FlexContainer = styled.div`
	display: inline-block;
`;
const GraphContainer = styled.div`
	display: block;
	text-align: center;
`;

export default class UnitChart extends Component {
	constructor(props) {
		super(props);

		this.setUnit = this.setUnit.bind(this);
		this.getKeyWithValue = this.getKeyWithValue.bind(this);
		this.state = {
			unit: this.getKeyWithValue(1)
		};
	}

	yAxisFormat = t => {
		return numeral(t).format("0a");
	};

	setUnit(event) {
		this.setState({ unit: this.getKeyWithValue(event.target.value) });
	}

	getKeyWithValue(val) {
		return Object.keys(this.props.units).filter(
			x => this.props.units[x] === val
		)[0];
	}

	render() {
		const unitVal = this.props.units[this.state.unit];
		let data = this.props.data.map(x => {
			return { x: x.x, y: x.y * unitVal };
		});
		const unitId = `units-${null}`;

		return (
			<GraphContainer>
				<FlexContainer>
					<GraphCenterer>
						<CenteredForm>
							<InputLabel htmlFor={unitId}>Units</InputLabel>
							<SelectField
								input={<Input name="sort" id={unitId} />}
								onChange={this.setUnit}
								value={unitVal}
								style={{ textAlign: "left" }}
							>
								{Object.keys(this.props.units).map(x => {
									return (
										<MenuItem key={x} value={this.props.units[x]}>
											{titleize(x)}
										</MenuItem>
									);
								})}
							</SelectField>
						</CenteredForm>

						<GraphDiv>
							<VictoryChart
								theme={VictoryTheme.material}
								domainPadding={10}
								padding={50}
							>
								<VictoryBar style={{ data: { fill: "#c43a31" } }} data={data} />
								<VictoryAxis
									independentAxis
									style={{
										grid: { stroke: "none" },
										tickLabels: {
											fontSize: 9
										}
									}}
								/>
								<VictoryAxis dependentAxis tickFormat={this.yAxisFormat} />
							</VictoryChart>
						</GraphDiv>
					</GraphCenterer>
				</FlexContainer>
			</GraphContainer>
		);
	}
}
