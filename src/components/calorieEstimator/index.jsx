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
        this.state = {
            age:21,
            gender:'male',
            cm:180,
            kg:90,
            activityLevel:'sedentary'
        };
    }

    handleFormChange(key) {
        return (event, indexOrMaybeValue, value) => {
            let newState = {};
            newState[key] = (value !== undefined) ? value : indexOrMaybeValue;
            console.log(key,newState[key])
            this.setState(newState);
        }
    }
    render() {
        const calPerDay = HarrisBenedict(this.state);

        return (
            // cannot use styled components - https://github.com/mui-org/material-ui/issues/783#issuecomment-340068259
            <div style={{textAlign:'center'}}>
                <div>
                    <SelectField
                        floatingLabelText="Gender"
                        onChange={this.handleFormChange('gender')}
                        value={this.state.gender}
                        style={{ width: '100px', textAlign: 'left' }}
                    >
                        <MenuItem value={'female'} primaryText="Female" />
                        <MenuItem value={'male'} primaryText="Male" />
                    </SelectField>

                    <TextField
                        type="number"
                        floatingLabelText="Age"
                        value={this.state.age}
                        min={0}
                        max={150}
                        style={{ width: '100px', textAlign: 'left' }}
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
                    <SelectField
                        floatingLabelText="Activity Level"
                        onChange={this.handleFormChange('activityLevel')}
                        value={this.state.activityLevel}
                        style={{ width: '150px', textAlign: 'left' }}
                    >
                        <MenuItem value={'sedentary'} primaryText="Sedentary" />
                        <MenuItem value={'light'} primaryText="Light" />
                        <MenuItem value={'moderate'} primaryText="Moderate" />
                        <MenuItem value={'heavy'} primaryText="Heavy" />
                        <MenuItem value={'vHeavy'} primaryText="Very Heavy" />
                    </SelectField>

                </div>
                <div>
                    <TextField
                        floatingLabelText="Calories/Day"
                        disabled
                        style={{ textAlign: 'left' }}
                        value={calPerDay.toLocaleString()}
                    />
                    <TextField
                        floatingLabelText="Calories/Year"
                        disabled
                        style={{ textAlign: 'left' }}
                        value={(calPerDay * 365).toLocaleString()}
                    />
                </div>
            </div>
        );
    }
}
