import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input'; import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import {
    VictoryChart, VictoryTheme, VictoryBar
} from 'victory';

import styled from 'styled-components';

import WRI from '../../../assets/data/environment/wri.js';
import { titleize } from '../../../utils/GeneralUtils';
import VizHelpExplanation from './help';
import ModifiableUnitBarChart from '../../modifiableUnitBarChart';

const ContainerDiv = styled.div`
text-align:center;
`;

const LeftH2 = styled.h2`
text-align:left;
`

export default class CalorieForm extends Component {
    constructor(props) {
        super(props);
    }

    getEnvImpact(dietFoods, impactType) {
        const dietComponentsCalories = Object.keys(dietFoods).reduce((sum, foodType) => {
            const usage = (dietFoods[foodType] || 0) / 100.0;
            return sum + WRI[impactType][foodType] * usage;
        }, 0);
        const cals = this.props.dailyCalories || 0;
        const calRatio = cals * 365.25 / 1000000; //WRI is data is for 1 million calories

        const scaledImpact = calRatio * dietComponentsCalories;
        return scaledImpact;
    }

    getEnvData(impactType) {
        let foodUsageData = this.props.refFoodUsages.slice(); //copy
        foodUsageData.push({ label: 'You', data: this.props.foodUsage });
        foodUsageData = foodUsageData.map(x => {
            return { x: titleize(x.label), y: this.getEnvImpact(x.data, impactType) };
        });
        return foodUsageData;
    }

    render() {
        if (!this.props.foodUsage) return null;

        return (
            <ContainerDiv>
                <LeftH2>
                    Your Food's Yearly Impact
                    <VizHelpExplanation
                        refFoodUsages={this.props.refFoodUsages}
                    />
                </LeftH2>

                <h3>Water</h3>
                <ModifiableUnitBarChart
                    units={WRI.units['water']}
                    data={this.getEnvData('water')}
                />

                <h3>Land</h3>
                <ModifiableUnitBarChart
                    units={WRI.units['land']}
                    data={this.getEnvData('land')}
                />

                <h3>GHG</h3>
                <ModifiableUnitBarChart
                    units={WRI.units['ghg']}
                    data={this.getEnvData('ghg')}
                />
            </ContainerDiv>
        );
    }
}
