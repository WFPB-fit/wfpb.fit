import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
// import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import HarrisBenedict from './HarrisBenedict.js';
import UnitField from './UnitField.jsx';

export default class CalorieForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.state = {
            age: 21,
            gender: 'male',
            cm: 180,
            kg: 90,
            activityLevel: 'sedentary'
        };
    }

    handleFormChange(key) {
        return (event) => {
            let newState = {};
            newState[key] = (typeof event === 'object') ? event.target.value : event;
            this.setState(newState);
        }
    }
    render() {
        const calPerDay = HarrisBenedict(this.state);

        return (
            // cannot use styled components - https://github.com/mui-org/material-ui/issues/783#issuecomment-340068259
            <div style={{ textAlign: 'center' }}>
                <div>
                    <FormControl>
                        <InputLabel htmlFor='gender'>Activity Level</InputLabel>
                        <SelectField
                            input={<Input name="sort" id='gender' />}
                            onChange={this.handleFormChange('gender')}
                            value={this.state.gender}
                            style={{ width: '100px', textAlign: 'left' }}
                        >
                            <MenuItem value={'female'}>Female</MenuItem>
                            <MenuItem value={'male'}>Male</MenuItem>
                        </SelectField>
                    </FormControl>

                    <TextField
                        label="Age"
                        type="number"
                        value={this.state.age}
                        style={{ width: '100px', textAlign: 'left' }}
                        inputProps={{
                            min: 0
                        }}
                        onChange={this.handleFormChange('age')}
                    />

                    <UnitField
                        onChange={this.handleFormChange('cm')}
                        title="Height"
                        default={this.state.cm}
                        style={{ textAlign: 'left' }}
                        units={{
                            cm: 1,
                            in: 2.54,
                        }}
                    />

                    <UnitField
                        onChange={this.handleFormChange('kg')}
                        title="Weight"
                        style={{ textAlign: 'left' }}
                        default={this.state.kg}
                        units={{
                            kg: 1,
                            lbs: 0.453592
                        }}
                    />

                    <FormControl>
                        <InputLabel htmlFor='activity-level'>Activity Level</InputLabel>
                        <SelectField
                            input={<Input name="sort" id='activity-level' />}
                            onChange={this.handleFormChange('activityLevel')}
                            value={this.state.activityLevel}
                            style={{ width: '150px', textAlign: 'left' }}
                        >
                            <MenuItem value={'sedentary'} >Sedentary</MenuItem>
                            <MenuItem value={'light'} >Light</MenuItem>
                            <MenuItem value={'moderate'} >Moderate</MenuItem>
                            <MenuItem value={'heavy'} >Heavy</MenuItem>
                            <MenuItem value={'vHeavy'} >Very Heavy</MenuItem>
                            {/* <Tooltip id="tooltip-sedentary" title="Little or no exercise" placement="right">
                                <MenuItem value={'sedentary'} >Sedentary</MenuItem>
                            </Tooltip>
                            <Tooltip id="tooltip-light" title="Little or no exercise" placement="right">
                                <MenuItem value={'light'} >Light</MenuItem>
                            </Tooltip>
                            <Tooltip id="tooltip-moderate" title="Little or no exercise" placement="right">
                                <MenuItem value={'moderate'} >Moderate</MenuItem>
                            </Tooltip>
                            <Tooltip id="tooltip-heavy" title="Little or no exercise" placement="right">
                                <MenuItem value={'heavy'} >Heavy</MenuItem>
                            </Tooltip>
                            <Tooltip id="tooltip-vHeavy" title="Little or no exercise" placement="right">
                                <MenuItem value={'vHeavy'} >Very Heavy</MenuItem>
                            </Tooltip> */}
                        </SelectField>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        label="Calories/Day"
                        disabled
                        value={calPerDay.toLocaleString()}
                        style={{ textAlign: 'left' }}
                    />
                    <TextField
                        label="Calories/Year"
                        disabled
                        value={(calPerDay * 365).toLocaleString()}
                        style={{ textAlign: 'left' }}
                    />
                </div>
            </div>
        );
    }
}
