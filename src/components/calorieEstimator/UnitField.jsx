import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import { titleize } from '../../utils/GeneralUtils';

export default class UnitField extends Component {
    state = {
        unit: Object.keys(this.props.units)[0],
        amount: this.props.default
    }

    constructor(props) {
        super(props);

        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.handleAmtChange = this.handleAmtChange.bind(this);
    }

    handleUnitChange(event) {
        const value = event.target.value;
        
        const oldUnitVal = this.props.units[this.state.unit];
        const newUnitVal = this.props.units[value];
        const adjustedAmountByUnit = (this.state.amount * oldUnitVal) / newUnitVal;
        this.handleAmtChange(event, adjustedAmountByUnit, value);

        this.setState({ unit: value });
    }
    handleAmtChange(event, value, unit = this.state.unit) {
        value = value || event.target.value;
        value = parseFloat(parseFloat(value).toFixed(2));
        this.setState({ amount: value });

        if (this.props.onChange) this.props.onChange(value * this.props.units[unit]);
    }

    render() {
        const selectId = `select-field-${this.props.title}`;
        return (
            <span>
                <TextField
                    label={this.props.title}
                    type="number"
                    value={this.state.amount}
                    style={{ width: '100px' }}
                    inputProps={{
                        min:0
                    }}
                    onChange={this.handleAmtChange}
                />

                <FormControl>
                    <InputLabel htmlFor={selectId}>Unit</InputLabel>
                    <SelectField
                        input={<Input name="sort" id={selectId} />}
                        onChange={this.handleUnitChange}
                        value={this.state.unit}
                        style={{ width: '100px' }}
                    >
                        {
                            Object.keys(this.props.units).map(x => {
                                return (<MenuItem value={x} key={x}>{titleize(x)}</MenuItem>);
                            })
                        }
                    </SelectField>
                </FormControl>
            </span >
        );
    }
}
