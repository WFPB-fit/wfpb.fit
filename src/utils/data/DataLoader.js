import {
	combineReducers
} from 'redux'
import {
	getNutrientFromId,
	titleize
} from '../GeneralUtils.jsx';
import pluralize from 'pluralize';

import GraphNutrients from '../../assets/data/preprocessed_data/graphNutrients.json';
import FoodGroupIdIndex from '../../assets/data/foodGroupIds.json';

export default class DataLoader {
	static async init(store) {
		DataLoader.store = store;

		DataLoader.loadFoodData();
		DataLoader.load_studies_data();
	}

	static get(varName) {
		if (DataLoader[varName]) return DataLoader[varName];
		else if (localStorage.getItem(varName)) return JSON.parse(localStorage.getItem(varName));
		else {
			return DataLoader[varName];
		}
	}

	static async loadFoodNutrients() {
		let foodData = JSON.parse(localStorage.getItem('foodData'));
		if (!foodData) {
			const FoodData = await DataLoader.getNutrientsRawData();
		}
	}

	static async loadFoodData() {
		let indices = JSON.parse(localStorage.getItem('foodIndex'));
		let foodData = JSON.parse(localStorage.getItem('foodData'));

		if (!indices || !foodData) {
			foodData = await DataLoader.getFoodsRawData();
			foodData = foodData ;//DataLoader._preprocessFoodData(foodData);
			indices = DataLoader._preprocessFoodIndices(foodData);

			localStorage.setItem('foodIndex', JSON.stringify(indices));
			localStorage.setItem('foodData', JSON.stringify(foodData));
		}

		DataLoader.store.dispatch({
			type: 'ADD_INDEXED_FOODS',
			indices: indices
		});
		DataLoader.store.dispatch({
			type: 'ADD_FOOD_DATA',
			foodData: foodData
		});
	}

	static async load_studies_data(){
		let studies = await import ('../../assets/data/preprocessed_data/studies.json');
		let studies_text = await import ('../../assets/data/preprocessed_data/studies_text.json');

		//studies
		DataLoader.store.dispatch({
			type: 'ADD_STUDIES_METADATA',
			data: studies
		});
		DataLoader.store.dispatch({
			type: 'ADD_STUDIES_TEXT',
			data: studies_text
		});
	}

	static _preprocessFoodData(foodData) {
		const groupNames = Object.keys(GraphNutrients);
		const foodIds = Object.keys(foodData);

		//add each group to the return value
		for (const foodId of foodIds) {
			let indexedFoodNutrients = {};

			for (const groupName of groupNames) {
				let groupNutrients = {};
				const foodNutrients = foodData[foodId].n;
				//for each nutrient in this group, add its FDA value to return value
				for (let nId of GraphNutrients[groupName]) {
					if (nId in foodNutrients) {
						groupNutrients[nId] = foodNutrients[nId];
					}

				}
				indexedFoodNutrients[groupName] = groupNutrients;
			}
			foodData[foodId].n = indexedFoodNutrients;
		}
		return foodData;
	}

	static _preprocessFoodFilter(filterName) {
		filterName = titleize(filterName);

		//make last word singular
		let words = filterName.split();
		words[words.length - 1] = pluralize.singular(words[words.length - 1]);
		filterName = words.join();

		filterName = filterName.trim();
		return filterName;
	}

	static _preprocessFoodIndices(foodData) {
		let foodIndex = {};
		const foodIds = Object.keys(foodData);

		for (const foodId of foodIds) {
			const food = foodData[foodId];
			const foodName = food.name;
			const groupName = FoodGroupIdIndex[food.fg]
			const foodFilters = foodName.split(',');

			//add group to total food index if needed. Set top level index of this food to the group
			if (!(groupName in foodIndex)) foodIndex[groupName] = {};
			let prevIndex = foodIndex[groupName];

			//iterate over each of the food's filters, indexing on each
			for (let i = 0; i < foodFilters.length; i++) {
				const filter = DataLoader._preprocessFoodFilter(foodFilters[i]);
				if (!(filter in prevIndex)) prevIndex[filter] = {}; //add index if not present
				prevIndex = prevIndex[filter];
				if (i === (foodFilters.length - 1)) prevIndex[''] = foodId;
			}
		}

		return foodIndex;
	}

	static async getFoodsRawData() {
		if (!DataLoader.foods) {
			DataLoader.foods = await
			import ('../../assets/data/preprocessed_data/foods.json');
		}
		return DataLoader.foods;
	}

}
