import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

import styled from 'styled-components';

import CalorieEstimator from './calorieEstimator/index.jsx';
import FoodEstimator from './foodEstimator';
import DataVis from './dataVis.jsx';

import WRR from '../../assets/data/environment/wrr.js';
import ReferenceFoodUsage from '../../assets/data/environment/ReferenceFoodUsage.js';

const HideableDiv = styled.div`
display: ${props => props.visible ? 'block' : 'none'}
`;

export default class CalorieForm extends Component {
    constructor(props) {
        super(props);

        this.toggleOverallVisible = this.toggleOverallVisible.bind(this);
        this.foodUsageChanged = this.foodUsageChanged.bind(this);

        this.state = {
            overallVisible: false
        }
    }

    toggleOverallVisible() {
        this.setState({ overallVisible: !this.state.overallVisible });
    }
    foodUsageChanged(foods) {
        this.setState({ foods: foods });
    }

    render() {
        return (
            <div>
                <CalorieEstimator />
                <FoodEstimator
                    foodUsageChanged={this.foodUsageChanged}
                />

                <Button
                    raised
                    color="primary"
                    onClick={this.toggleOverallVisible}
                >
                    {(this.state.overallVisible) ? 'Hide Overall' : 'View Overall'}
                </Button>

                <DataVis
                    foodUsage={this.state.foods}
                    refFoodUsages={ReferenceFoodUsage}
                />

                <HideableDiv
                    visible={this.state.overallVisible}
                >
                    <p>asd</p>
                </HideableDiv>
            </div>
        );
    }
}
