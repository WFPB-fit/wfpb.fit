import FoodData from '../assets/data/nutrition/foodData.json';
import {
	FoodGroupIds
} from '../assets/data/importantNutrients.json';
import { combineReducers } from 'redux'


export default class DataContainer {
   
	static async init() {
        DataContainer.fgIdIndex = JSON.parse(localStorage.getItem('fgIdIndex'));
        DataContainer.fgNameIndex = JSON.parse(localStorage.getItem('fgNameIndex'));
        
        const foodGroupIdsLoaded = DataContainer.fgIdIndex && DataContainer.fgNameIndex;
        if(!foodGroupIdsLoaded) DataContainer._parseFoodGroupIdAndNameIndices;
	}

	static get(varName) {
		if (DataContainer[varName]) return DataContainer[varName];
		else if (localStorage.getItem(varName)) return JSON.parse(localStorage.getItem(varName));
		else {
			return DataContainer[varName];
		}
	}

	static _parseFoodGroupIdAndNameIndices() {
		let fgIdIndex = {};
		let fgNameIndex = {};
		for (const [id, name] of FoodGroupIds) {
			fgIdIndex[id] = name;
			fgNameIndex[name] = id;
		}

		//save output
		DataContainer.fgIdIndex = fgIdIndex;
		DataContainer.fgNameIndex = fgNameIndex;
		localStorage.setItem('fgIdIndex', JSON.stringify(fgIdIndex));
		localStorage.setItem('fgNameIndex', JSON.stringify(fgNameIndex));
	}
}
