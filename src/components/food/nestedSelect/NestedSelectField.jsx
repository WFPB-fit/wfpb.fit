import React, { Component } from 'react';
import {
    VictoryChart,
    VictoryTooltip, createContainer,

    VictoryArea, VictoryPolarAxis, VictoryTheme
} from 'victory';
import { alphaCompare } from '../../../utils/GeneralUtils.jsx';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class NestedSelectField extends Component {
    constructor(props) {
        super(props);
        this.handleSelectChangeClosure = this.handleSelectChangeClosure.bind(this);
        this.getSelectField = this.getSelectField.bind(this);
        this.getFilteredObj = this.getFilteredObj.bind(this);

        this.state = {
            selectedKeys: this.props.selectedKeys
        };
    }
    componentWillReceiveProps(props) {
        this.setState({ selectedKeys: props.selectedKeys });
    }

    getFilteredObj(keys) {
        let lastObj = this.props.selectObject;
        for (const key of keys) {
            lastObj = lastObj[key];
        }
        return lastObj;
    }

    handleSelectChangeClosure(selectFieldIndx) {
        let updateSelectedFieldsClosure = (event, index, value) => {
            let newKeys = null;
            if (selectFieldIndx < this.state.selectedKeys.length) {
                //user selected previous select obj, remove all the ones after it
                newKeys = this.state.selectedKeys.slice(0, selectFieldIndx + 1);
                newKeys[selectFieldIndx] = value;
            } else {
                //add the new select
                newKeys = this.state.selectedKeys.slice();
                newKeys.push(value);
            }

            //automatically add the key if there is only 1
            let keys = Object.keys(this.getFilteredObj(newKeys));
            while (keys.length === 1 && keys[0] !== "") {
                newKeys.push(keys[0]);
                keys = Object.keys(this.getFilteredObj(newKeys));
            }

            //update state
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
                    keys.map(x => <MenuItem key={x} value={x} primaryText={x} />)
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
