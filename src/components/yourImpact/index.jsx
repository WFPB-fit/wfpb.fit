import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

import styled from 'styled-components';

import CalorieEstimator from './calorieEstimator/index.jsx';
import FoodEstimator from '../foodEstimator';
import DataVis from './dataVis.jsx';

import WRI from '../../assets/data/environment/wri.js';
import ReferenceFoodUsage from '../../assets/data/environment/ReferenceFoodUsage.js';

const HideableDiv = styled.div`
display: ${props => props.visible ? 'block' : 'none'}
`;
const Wrapper = styled.div`
img{
    display:block;
    margin:0 auto;
}
`;

export default class YourImpact extends Component {
    constructor(props) {
        super(props);

        this.toggleOverallVisible = this.toggleOverallVisible.bind(this);
        this.handleDietCompositionChange = this.handleDietCompositionChange.bind(this);
        this.getTotalDietCompPercent = this.getTotalDietCompPercent.bind(this);
        this.handleDailyCaloriesChange = this.handleDailyCaloriesChange.bind(this);

        this.state = {
            overallVisible: false,
            dietComposition: {},
            dailyCalories: 0
        };

        //set default food usages to some random vegan amounts. Can try to find better data-backed defaults later
        Object.keys(WRI['land']).forEach(x => { this.state.dietComposition[x] = 0; })
        this.state.dietComposition.Wheat = 5;
        this.state.dietComposition.Rice = 5;
        this.state.dietComposition.Maize = 5;
        this.state.dietComposition['Roots and tubers'] = 20;
        this.state.dietComposition['Fruits and vegetables'] = 40;
        this.state.dietComposition.Nuts = 15;
        this.state.dietComposition.Pulses = 10;
    }

    toggleOverallVisible() {
        this.setState({ overallVisible: !this.state.overallVisible });
    }

    handleDietCompositionChange(key) {
        return (event) => {
            let newState = Object.assign({}, this.state.dietComposition);
            newState[key] = event.target.value;
            this.setState({ dietComposition: newState });
        }
    }
    handleDailyCaloriesChange(cal) {
        this.setState({ dailyCalories: cal });
    }
    getTotalDietCompPercent(dietComp) {
        return Object.keys(dietComp).reduce((sum, key) => {
            const val = parseInt(dietComp[key] || 0);
            return sum + val;
        }, 0);
    }

    render() {
        let viz = null;
        if (this.getTotalDietCompPercent(this.state.dietComposition) == 100) {
            viz = (
                <DataVis
                    foodUsage={this.state.dietComposition}
                    refFoodUsages={ReferenceFoodUsage}
                    dailyCalories={this.state.dailyCalories}
                />
            );
        }

        return (
            <Wrapper>
                <h2>Calorie Estimator</h2>
                <CalorieEstimator
                    handleDailyCaloriesChange={this.handleDailyCaloriesChange}
                />

                <h2>Diet Composition</h2>
                <h4>Where do your calories come from?</h4>
                <FoodEstimator
                    handleDietCompositionChange={this.handleDietCompositionChange}
                    dietComposition={this.state.dietComposition}
                    getTotalDietCompPercent={this.getTotalDietCompPercent}
                />

                {viz}


                {/* <Button
                    raised
                    color="primary"
                    onClick={this.toggleOverallVisible}
                >
                    {(this.state.overallVisible) ? 'Hide Overall' : 'View Overall'}
                </Button>
                <HideableDiv
                    visible={this.state.overallVisible}
                >
                    <p>asd</p>
                </HideableDiv> */}


                {/* <FoodEstimator
                    disabled
                    dietComposition={ReferenceFoodUsage[0].data} //Vegan
                    getTotalDietCompPercent={this.getTotalDietCompPercent}
                /> */}
            </Wrapper>
        );
    }
}
