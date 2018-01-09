import React, { Component } from 'react';
import {
    VictoryChart,
    VictoryTooltip, createContainer,

    VictoryArea, VictoryPolarAxis, VictoryTheme
} from 'victory';
import { alphaCompare, titleize } from '../../../utils/GeneralUtils.jsx';

import SelectField from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
// import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

export default class NestedSelectField extends Component {
    constructor(props) {
        super(props);
        this.handleSelectChangeClosure = this.handleSelectChangeClosure.bind(this);
        this.getSelectField = this.getSelectField.bind(this);
        this.getFilteredObj = this.getFilteredObj.bind(this);
        this.getFoodButton = this.getFoodButton.bind(this);
        this.addFoodClosure = this.addFoodClosure.bind(this);

        this.state = {
            selectedKeys: []
        };
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
        keys = keys.sort(alphaCompare).filter(x => x !== '');
        if (keys.length > 0) {
            const sortId = `sort-select-${x}`;
            return (
                <FormControl>
                    {/* <InputLabel htmlFor={sortId} >Sort</InputLabel> */}
                    <SelectField
                        // input={<Input name="sort" id={sortId} />}
                        value={value}
                        key={indexKey}
                        onChange={this.handleSelectChangeClosure(indexKey)}
                    >

                        {
                            keys.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)
                        }
                    </SelectField>
                </FormControl>
            );
        }
        else { return null; }
    }

    getFoodButton(foodObj) {
        if ("" in foodObj) {
            const foodId = foodObj[""];
            const foodIdAlreadySelected = this.props.selectedFoods.filter(x => x.value === foodId).length === 1;
            if (!foodIdAlreadySelected) {
                const foodName = titleize(this.props.allFoodData[foodId].name);
                return (
                    <Button
                        raised
                        primary
                        key={foodId}
                        onClick={this.addFoodClosure(foodId, foodName)}
                    >
                        Add Food
                    </Button>

                );
            }
        }
        return null;
    }

    addFoodClosure(foodId, foodName) {
        return () => this.props.addFood(foodId, foodName);
    }

    render() {
        console.log(this.state.selectedKeys)
        let selectFields = [];
        let addFoodButtons = [];

        //create a select field for each selected key
        let prevSelectObj = this.props.selectObject;
        for (let i = 0; i < this.state.selectedKeys.length; i++) {
            const selectedKey = this.state.selectedKeys[i];
            const keys = Object.keys(prevSelectObj).sort(alphaCompare);
            // console.log(selectedKey, this.state.selectedKeys, Object.keys(prevSelectObj))
            selectFields.push(this.getSelectField(Object.keys(prevSelectObj), i, selectedKey));
            addFoodButtons.push(this.getFoodButton(prevSelectObj));
            prevSelectObj = prevSelectObj[selectedKey];
        }

        //add select field for next level in object
        if (typeof prevSelectObj === 'object') {
            selectFields.push(this.getSelectField(Object.keys(prevSelectObj), this.state.selectedKeys.length, null));
            addFoodButtons.push(this.getFoodButton(prevSelectObj));
        }

        return (
            <div>
                <div>{selectFields}</div>
                <div>{addFoodButtons}</div>
            </div>
        );
    }
}