import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import styled from 'styled-components';

import FormHelperText from '@material-ui/core/FormHelperText';

import CalorieEstimator from './calorieEstimator/index.jsx';
import FoodEstimator from '../foodEstimator';
import DataVis from './viz/index.jsx';
import Help from '../help';
import WRI from '../../assets/data/environment/wri.js';
import ReferenceFoodUsage from '../../assets/data/environment/ReferenceFoodUsage.js';
import { sumValues, getLink } from '../../utils/GeneralUtils.jsx';



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
        this.state.dietComposition['Roots and tubers'] = 5;
        this.state.dietComposition['Fruits and vegetables'] = 45;
        this.state.dietComposition.Nuts = 10;
        this.state.dietComposition.Pulses = 25;
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

    render() {
        let viz = null;
        if (sumValues(this.state.dietComposition) == 100) {
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
                <h2>Calorie Estimator
                    <Help
                        title="Calorie Estimator"
                        content={
                            <div>
                                <Typography>We use the {getLink("https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation", "Harris–Benedict equation")} for estimating daily calories. That value is multiplied by 365.25 to get your yearly calories.</Typography>
                            </div>
                        }
                    /></h2>
                <CalorieEstimator
                    handleDailyCaloriesChange={this.handleDailyCaloriesChange}
                />

                <h2>Diet Composition
                    <Help
                        title="Diet Compositon"
                        content={
                            <div>
                                <h4>Categories</h4>
                                <Typography>Roots and tubers include potatoes, yams, carrots, cassava, and other vegetables or starchs that grow underground.</Typography>
                                <br/>
                                <Typography>Pulses are the grain seed of {getLink("https://en.wikipedia.org/wiki/Legume", "Legumes")}, and include beans, chickpeas, alfalfa, lentils, peas, peanuts, and much more. All pulses are nitrogen-fixing, and thus do not require much, if any, fertilizer.</Typography>
                                <h4>Source</h4>
                                <Typography>These food categories and corresponding data are from the World Research Institute's "Shifting Diets for a Sustainable Food Future".</Typography>
                                <br />
                                <Typography>Ranganathan, J. et al. 2016. “Shifting Diets for a Sustainable Food Future.” Working Paper, Installment 11 of Creating a Sustainable Food Future. Washington, DC: World Resources Institute. Accessible at http://www.worldresourcesreport.org.</Typography>
                            </div>
                        }
                    />
                </h2>
                <h4>Where do your calories come from?</h4>
                <FoodEstimator
                    handleDietCompositionChange={this.handleDietCompositionChange}
                    dietComposition={this.state.dietComposition}
                />

                {viz}
            </Wrapper>
        );
    }
}
