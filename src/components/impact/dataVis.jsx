import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

import {
    VictoryChart, VictoryTheme, VictoryBar
} from 'victory';

import styled from 'styled-components';

import WRR from '../../assets/data/environment/wrr.js';
import { titleize } from '../../utils/GeneralUtils';

const GraphDiv = styled.div`
display:inline-block;
max-width:450px;
`;

const ContainerDiv = styled.div`
text-align:center;
`;
export default class CalorieForm extends Component {
    constructor(props) {
        super(props);
    }

    getEnvImpact(dietFoods, impactType) {
        const dietComponentsCalories =  Object.keys(dietFoods).reduce((sum, foodType) => {
            const usage = (dietFoods[foodType] || 0) / 100.0;
            return sum + WRR[impactType][foodType] * usage;
        }, 0);
        const cals = this.props.dailyCalories || 0;
        const calRatio = cals * 365.25 / 1000000; //WRR is data is for 1 million calories

        return calRatio * dietComponentsCalories;
    }

    getEnvImpactChart(impactType) {
        if (!this.props.foodUsage) return null;

        let foodUsageData = this.props.refFoodUsages.slice(); //copy
        foodUsageData.push({ label: 'You', data: this.props.foodUsage });
        foodUsageData = foodUsageData.map(x => {
            return { x: titleize(x.label), y: this.getEnvImpact(x.data, impactType) };
        });

        return (
            <GraphDiv>
                <h2>{titleize(impactType)}</h2>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}
                >
                    <VictoryBar
                        style={{ data: { fill: "#c43a31" } }}
                        data={foodUsageData}
                    />
                </VictoryChart>
            </GraphDiv>
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
