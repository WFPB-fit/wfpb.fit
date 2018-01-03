import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import HarrisBenedict from './HarrisBenedict.js';
import UnitField from './UnitField.jsx';

export default class CalorieForm extends Component {
    constructor(props) {
        super(props);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.state = {};
    }

    handleFormChange(key) {
        return (event, indexOrMaybeValue, value) => {
            let newState = {};
            newState[key] = (value !== undefined) ? value : indexOrMaybeValue;
            this.setState(newState);
        }
    }
    render() {
        const calPerDay = HarrisBenedict(this.state);
        return (
            <div>
                <SelectField
                    floatingLabelText="Gender"
                    onChange={this.handleFormChange('gender')}
                    value={this.state.gender}
                >
                    <MenuItem value={'female'} primaryText="Female" />
                    <MenuItem value={'male'} primaryText="Male" />
                </SelectField>

                <TextField
                    type="number"
                    floatingLabelText="Age"
                    min={0}
                    max={150}
                    onChange={this.handleFormChange('age')}
                />

                <UnitField
                    onChange={this.handleFormChange('cm')}
                    title="Height"
                    units={{
                        in: 2.54,
                        cm: 1,
                    }}
                />

                <UnitField
                    onChange={this.handleFormChange('kg')}
                    title="Weight"
                    units={{
                        lbs: 0.453592,
                        kg: 1
                    }}
                />
                <SelectField
                    floatingLabelText="Activity Level"
                    onChange={this.handleFormChange('activityLevel')}
                    value={this.state.activityLevel}
                >
                    <MenuItem value={'sedentary'} primaryText="Sedentary" />
                    <MenuItem value={'light'} primaryText="Light" />
                    <MenuItem value={'moderate'} primaryText="Moderate" />
                    <MenuItem value={'heavy'} primaryText="Heavy" />
                    <MenuItem value={'vHeavy'} primaryText="Very Heavy" />
                </SelectField>


                <TextField
                    floatingLabelText="Calories/Day"
                    disabled
                    value={calPerDay.toLocaleString()}
                />
                <TextField
                    floatingLabelText="Calories/Year"
                    disabled
                    value={(calPerDay * 365).toLocaleString()}
                />
            </div>
        );
    }
}
