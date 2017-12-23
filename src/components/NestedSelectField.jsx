import React, { Component } from 'react';
import {
    VictoryChart,
    VictoryTooltip, createContainer,

    VictoryArea, VictoryPolarAxis, VictoryTheme
} from 'victory';
import { alphaCompare } from '../utils/GeneralUtils.jsx';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class NestedSelectField extends Component {
    constructor(props) {
        super(props);
        this.handleSelectChangeClosure = this.handleSelectChangeClosure.bind(this);
        this.getSelectField = this.getSelectField.bind(this);

        this.state = {
            selectedKeys: this.props.selectedKeys
        };
    }
    componentWillReceiveProps(props) {
        this.setState({ selectedKeys: props.selectedKeys });
    }

    handleSelectChangeClosure(selectFieldIndx) {
        let updateSelectedFieldsClosure = (event, index, value) => {
            console.log(value)
            let newKeys = null;
            if (selectFieldIndx < this.state.selectedKeys.length) {
                newKeys = this.state.selectedKeys.slice(0, selectFieldIndx + 1);
                newKeys[selectFieldIndx] = value;
            } else {
                newKeys = this.state.selectedKeys.slice(); //copy array
                newKeys.push(value);
            }
            this.setState({ selectedKeys: newKeys });
        }
        updateSelectedFieldsClosure = updateSelectedFieldsClosure.bind(this);
        return updateSelectedFieldsClosure;
    }

    getSelectField(keys, indexKey, value) {
        keys = keys.sort(alphaCompare);
        return (
            <SelectField
                value={value}
                key={indexKey}
                onChange={this.handleSelectChangeClosure(indexKey)}
            >
                {
                    keys.map(x => <MenuItem key={x} value={x} primaryText={x}/>)
                }
            </SelectField>
        );
    }

    render() {
        let selectFields = [];

        //create a select field for each selected key
        let prevSelectObj = this.props.selectObject;
        for (let i = 0; i < this.state.selectedKeys.length; i++) {
            const selectedKey = this.state.selectedKeys[i];
            const keys = Object.keys(prevSelectObj).sort(alphaCompare);
            // console.log(selectedKey, this.state.selectedKeys, Object.keys(prevSelectObj))
            selectFields.push(this.getSelectField(Object.keys(prevSelectObj), i, selectedKey));
            prevSelectObj = prevSelectObj[selectedKey];
        }
        //add select field for next level in object
        if (typeof prevSelectObj === 'object') {
            selectFields.push(this.getSelectField(Object.keys(prevSelectObj), this.state.selectedKeys.length, null));
        }

        return (
            <div>
                {selectFields}
            </div>
        );
    }
}
