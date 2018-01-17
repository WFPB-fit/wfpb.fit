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
import {titleize} from '../../utils/GeneralUtils';

export default class CalorieForm extends Component {
    constructor(props) {
        super(props);

        // this.handleFormChange = this.handleFormChange.bind(this);
    }

    getImpact(impactType) {
        return Object.keys(this.props.foodUsage).reduce((sum, foodType) => {
            const usage = this.props.foodUsage[foodType] || 0;
            return sum + WRR[impactType][foodType] * usage / 100.0;
        });
    }

    getImpactChart(impactType) {
        if (!this.props.foodUsage) return null;


        let foodUsageData = this.props.refFoodUsages.push({ label: 'You', data: this.props.foodUsage });
        foodUsageData = foodUsageData.map(x => {
            return { x: x.label, y: this.getImpact(impactType) };
        });

        return (
            <div>
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
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.getImpactChart('water')}
                {this.getImpactChart('land')}
                {this.getImpactChart('ghg')}
            </div>
        );
    }
}
