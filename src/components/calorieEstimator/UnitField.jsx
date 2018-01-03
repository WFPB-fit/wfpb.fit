import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { titleize } from '../../utils/GeneralUtils';

export default class UnitField extends Component {
    state = {
        unit: Object.keys(this.props.units)[0],
        amount: 0
    }

    constructor(props) {
        super(props);
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.handleAmtChange = this.handleAmtChange.bind(this);
    }

    handleUnitChange(event, index, value) {
        const oldUnitVal = this.props.units[this.state.unit];
        const newUnitVal = this.props.units[value];
        const adjustedAmountByUnit = (this.state.amount * oldUnitVal) / newUnitVal;
        this.handleAmtChange(null, adjustedAmountByUnit, value);

        this.setState({ unit: value });
    }
    handleAmtChange(event, value, unit = this.state.unit) {
        value = parseFloat(parseFloat(value).toFixed(2));
        this.setState({ amount: value });

        if (this.props.onChange) this.props.onChange(null, null, value * this.props.units[unit]);
    }

    render() {
        return (
            <div>
                <TextField
                    type="number"
                    floatingLabelText={this.props.title}
                    onChange={this.handleAmtChange}
                    value={this.state.amount}
                    min={0}
                />
                <SelectField
                    floatingLabelText="Unit"
                    onChange={this.handleUnitChange}
                    value={this.state.unit}
                >
                    {
                        Object.keys(this.props.units).map(x => {
                            return (<MenuItem value={x} primaryText={titleize(x)} />);
                        })
                    }
                </SelectField>

            </div>
        );
    }
}
