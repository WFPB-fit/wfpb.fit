import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

import styled from 'styled-components';

import WRI from '../../assets/data/environment/wri.js';

export default class CalorieForm extends Component {
    constructor(props) {
        super(props);
    }

    getFoodFields() {
        const percent = this.props.getTotalDietCompPercent(this.props.dietComposition);

        return Object.keys(WRI['land']).map(x => {

            if (this.props.dietComposition[x] > 0 || !this.props.disabled) {
                return (
                    <TextField
                        label={x}
                        type="number"
                        value={this.props.dietComposition[x]}
                        disabled={this.props.disabled}
                        key={x}
                        style={{ width: '100px' }}
                        inputProps={{
                            min: 0,
                            max: 100
                        }}
                        error={percent !== 100}
                        value={this.props.dietComposition[x]}
                        onChange={(this.props.disabled) ? null : this.props.handleDietCompositionChange(x)}
                    />
                );
            } else {
                return null;
            }
        });
    }

    render() {
        const percent = this.props.getTotalDietCompPercent(this.props.dietComposition);
        const isErr = (percent !== 100)
        const msg = (percent !== 100) ? `Must sum to 100%, not ${percent}%` : ``;
        return (
            <div>
                <div>
                    {this.getFoodFields()}
                </div>
                <p>{msg}</p>
            </div>
        );
    }
}
