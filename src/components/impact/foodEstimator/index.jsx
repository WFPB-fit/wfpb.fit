import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

import styled from 'styled-components';

import WRR from '../../../assets/data/environment/wrr.js';

export default class CalorieForm extends Component {
    constructor(props) {
        super(props);

        this.handleFormChange = this.handleFormChange.bind(this);
        this.isPercentageTotalWrong = this.isPercentageTotalWrong.bind(this);
        this.totalPercent = this.totalPercent.bind(this);

        this.state = {};

        //set default food usages to some random vegan amounts. Can try to find better data-backed defaults later
        Object.keys(WRR['land']).forEach(x => { this.state[x] = 0; })
        this.state.Wheat = 5;
        this.state.Rice = 5;
        this.state.Maize = 5;
        this.state['Roots and tubers'] = 20;
        this.state['Fruits and vegetables'] = 30;
        this.state.Nuts = 15;
        this.state.Pulses = 20;
    }

    totalPercent(){
        return Object.keys(this.state).reduce((sum, key) => sum + parseInt(this.state[key]), 0);
    }
    isPercentageTotalWrong() {
        return this.totalPercent() !== 100;
    }

    handleFormChange(key) {
        return (event) => {
            let newState = {};
            newState[key] = event.target.value;
            this.setState(newState);
        }
    }

    getFoodFields() {
        return Object.keys(WRR['land']).map(x => {
            return <TextField
                label={x}
                type="number"
                value={this.state[x]}
                key={x}
                style={{ width: '100px' }}
                inputProps={{
                    min: 0,
                    max: 100
                }}
                error={this.isPercentageTotalWrong()}
                value={this.state[x]}
                onChange={this.handleFormChange(x)}
            />
        });
    }

    render() {
        const errMessage = (this.isPercentageTotalWrong()) ? <p>Foods percentages must add to 100%, not {this.totalPercent()}%</p> : null;
        return (
            <div>
                <div>
                    {this.getFoodFields()}
                </div>
                {errMessage}
            </div>
        );
    }
}
