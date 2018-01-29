import React, { Component } from 'react';

import Button from 'material-ui/Button';

import { MenuItem } from 'material-ui/Menu';
import SelectField from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import {
    VictoryChart, VictoryTheme, VictoryBar
} from 'victory';

import styled from 'styled-components';

import WRI from '../../assets/data/environment/wri.js';
import { titleize } from '../../utils/GeneralUtils';

const GraphDiv = styled.div`
display:inline-block;
max-width:650px;
`;
const GraphCenterer = styled.div`
display: flex;
align-items: center;
`;
const CenteredForm = styled(FormControl) `
transform: translateY(-50%);
`;
const FlexContainer = styled.div`
display:inline-block;
`;
const GraphContainer = styled.div`
display:block;
`;
const ContainerDiv = styled.div`
text-align:center;
`;

export default class CalorieForm extends Component {
    constructor(props) {
        super(props);

        this.setEnvUnit = this.setEnvUnit.bind(this);
        this.state = {
            units: {
                land: 1,
                water: 1,
                ghg: 1,
            }
        }
    }

    setEnvUnit(impactType) {
        return (event) => {
            const value = event.target.value;
            let units = Object.assign({}, this.state.units);
            units[impactType] = value;
            this.setState({ units: units });
        };
    }

    getEnvImpact(dietFoods, impactType) {
        const dietComponentsCalories = Object.keys(dietFoods).reduce((sum, foodType) => {
            const usage = (dietFoods[foodType] || 0) / 100.0;
            return sum + WRI[impactType][foodType] * usage;
        }, 0);
        const cals = this.props.dailyCalories || 0;
        const calRatio = cals * 365.25 / 1000000; //WRI is data is for 1 million calories

        const scaledImpact = calRatio * dietComponentsCalories * this.state.units[impactType];
        return scaledImpact;
    }

    getEnvImpactChart(impactType) {
        if (!this.props.foodUsage) return null;

        let foodUsageData = this.props.refFoodUsages.slice(); //copy
        foodUsageData.push({ label: 'You', data: this.props.foodUsage });
        foodUsageData = foodUsageData.map(x => {
            return { x: titleize(x.label), y: this.getEnvImpact(x.data, impactType) };
        });

        const unitId = `units-${impactType}`;
        return (
            <GraphContainer>
                <h2>{titleize(impactType)}</h2>
                <FlexContainer>
                    <GraphCenterer>
                        <CenteredForm>
                            <InputLabel htmlFor={unitId}>Units</InputLabel>
                            <SelectField
                                input={<Input name="sort" id={unitId} />}
                                onChange={this.setEnvUnit(impactType)}
                                value={this.state.units[impactType]}
                                style={{ textAlign: 'left' }}
                            >
                                {
                                    Object.keys(WRI.units[impactType]).map(x => {
                                        return <MenuItem key={x} value={WRI.units[impactType][x]}>{titleize(x)}</MenuItem>
                                    })
                                }
                            </SelectField>
                        </CenteredForm>

                        <GraphDiv>
                            <VictoryChart
                                theme={VictoryTheme.material}
                                domainPadding={10}
                                padding={{ top: 5, bottom: 40, left: 100, right: 5 }}
                            >
                                <VictoryBar
                                    style={{ data: { fill: "#c43a31" } }}
                                    data={foodUsageData}
                                />
                            </VictoryChart>
                        </GraphDiv>
                    </GraphCenterer>
                </FlexContainer>
            </GraphContainer>
        );
    }

    render() {
        return (
            <ContainerDiv>
                {this.getEnvImpactChart('water')}
                {this.getEnvImpactChart('land')}
                {this.getEnvImpactChart('ghg')}
            </ContainerDiv>
        );
    }
}
