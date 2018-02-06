import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';

import {
    ImportantNutrients, FoodGroupIdIndex
} from '../../../assets/data/ImportantNutrients.js';
import nutrientNames from '../../../assets/data/nutrientNames.js';
import { titleize } from '../../../utils/GeneralUtils';

export default class Food extends Component {
    constructor(props) {
        super(props);

        //bind functions
        this.addFoods = this.addFoods.bind(this);
        this.getNutrientMenuItems = this.getNutrientMenuItems.bind(this);
        this.getFoodGroupMenuItems = this.getFoodGroupMenuItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNamed = this.handleChangeNamed.bind(this);

        //init vars
        this.state = {
            selectedNutrientId: 291,
            numFoods: 3,
            selectedFoodGroupId: 0
        };
    }

    addFoods() {
        const nId = this.state.selectedNutrientId;
        const foods = this.props.foodData;
        let fIds = Object.keys(foods);

        if (this.state.selectedFoodGroupId) {
            fIds = fIds.filter(fId => foods[fId].fg === this.state.selectedFoodGroupId);
        }

        const topFoodIds = fIds.sort(function (a, b) {
            return foods[b].n[nId] - foods[a].n[nId];
        });

        if(this.props.addFoods) this.props.addFoods(topFoodIds.slice(0, this.state.numFoods));
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleChangeNamed = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }


    getNutrientMenuItems() {
        let menuItems = [];
        for (const nType of Object.keys(ImportantNutrients)) {
            menuItems.push(
                <h4 key={nType}>{titleize(nType)}</h4>
            );
            for (const nId of ImportantNutrients[nType]) {
                menuItems.push(
                    <MenuItem key={nId} value={nId}>{nutrientNames[nId]}</MenuItem>
                );
            }
        }
        return menuItems;
    }

    getFoodGroupMenuItems() {
        let foodGroups = [];
        foodGroups.push(
            <MenuItem key={0} value={0}>All</MenuItem>
        );

        const namedFoodGroups = Object.keys(FoodGroupIdIndex).map(fgId => {
            return <MenuItem key={fgId} value={fgId}>{FoodGroupIdIndex[fgId]}</MenuItem>
        });

        return foodGroups.concat(namedFoodGroups);
    }

    render() {
        return (
            <div>
                <FormControl>
                    <InputLabel htmlFor='top-nutrients'>Nutrients</InputLabel>
                    <SelectField
                        input={<Input name="selectedNutrientId" id='top-nutrients' />}
                        onChange={this.handleChange}
                        value={this.state.selectedNutrientId}
                    >
                        {this.getNutrientMenuItems()}
                    </SelectField>
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor='food-groups'>Food Group</InputLabel>
                    <SelectField
                        input={<Input name="selectedFoodGroupId" id='food-groups' />}
                        onChange={this.handleChange}
                        value={this.state.selectedFoodGroupId}
                    >
                        {this.getFoodGroupMenuItems()}
                    </SelectField>
                </FormControl>

                <TextField
                    label="# Foods"
                    type="number"
                    margin="normal"
                    value={this.state.numFoods}
                    inputProps={{
                        min: 1
                    }}
                    onChange={this.handleChangeNamed('numFoods')}
                />

                <Button
                    variant="raised" 
                    color="primary"
                    onClick={this.addFoods}
                >
                    Add Foods
                </Button>
            </div>
        );
    }
}
