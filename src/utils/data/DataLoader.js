import {
	combineReducers
} from 'redux'
import {
	getNutrientFromId,titleize
} from '../GeneralUtils.jsx';
import pluralize from 'pluralize';

export default class DataLoader {
	static async init(store) {
		DataLoader.store = store;

		const fgIdIndex = await DataLoader.loadFoodGroups();
		DataLoader.loadFoodData(fgIdIndex);
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

	static async loadFoodGroups() {
		let idIndex = JSON.parse(localStorage.getItem('fgIdIndex'));
		let nameIndex = JSON.parse(localStorage.getItem('fgNameIndex'));
		let foodIds = null;

		if (!idIndex) {
			const {
				FoodGroupIds
			} = await DataLoader.getImportantNutrients();
			idIndex = {};
			for (const [id, name] of FoodGroupIds) {
				idIndex[id] = name;
			}
			localStorage.setItem('fgIdIndex', JSON.stringify(idIndex));
		}

		if (!nameIndex) {
			const {
				FoodGroupIds
			} = await DataLoader.getImportantNutrients();

			nameIndex = {};
			for (const [id, name] of FoodGroupIds) {
				nameIndex[name] = id;
			}
			localStorage.setItem('fgNameIndex', JSON.stringify(nameIndex));
		}

		DataLoader.store.dispatch({
			type: 'ADD_FG_ID_INDEX',
			foodGroupIndex: idIndex
		});
		DataLoader.store.dispatch({
			type: 'ADD_FG_NAME_INDEX',
			foodGroupIndex: nameIndex
		});

		return idIndex;
	}

	static async loadFoodData(fgIdIndex) {
		let indices = JSON.parse(localStorage.getItem('foodIndex'));
		let foodData = JSON.parse(localStorage.getItem('foodData'));

		if (!indices || !foodData) {
			foodData = await DataLoader.getFoodsRawData();
			const {
				ImportantNutrients
			} = await DataLoader.getImportantNutrients();
			foodData = DataLoader._preprocessFoodData(foodData, ImportantNutrients);
			indices = DataLoader._preprocessFoodIndices(foodData, fgIdIndex);

			localStorage.setItem('foodIndex',JSON.stringify(indices));
			localStorage.setItem('foodData',JSON.stringify(foodData));
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

	static _preprocessFoodData(foodData, importantNutrients) {
		const groupNames = Object.keys(importantNutrients);
		const foodIds = Object.keys(foodData);

		//add each group to the return value
		for (const foodId of foodIds) {
			let indexedFoodNutrients = {};

			for (const groupName of groupNames) {
				let groupNutrients = {};
				const foodNutrients = foodData[foodId].n;
				//for each nutrient in this group, add its FDA value to return value
				for (let nId of importantNutrients[groupName]) {
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
	
	static _preprocessFoodIndices(foodData, fgIdIndex) {
		let foodIndex = {};
		const foodIds = Object.keys(foodData);

		for (const foodId of foodIds) {
			const food = foodData[foodId];
			const foodName = food.name;
			const groupName = fgIdIndex[food.fg]
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


	static async getImportantNutrients() {
		if (!DataLoader.importantNutrients) {
			DataLoader.importantNutrients = await
			import ('../../assets/data/importantNutrients.js');
		}
		return DataLoader.importantNutrients;
	}
	static async getFoodsRawData() {
		if (!DataLoader.foods) {
			DataLoader.foods = await
			import ('../../assets/data/nutrition/foodData.json');
		}
		return DataLoader.foods;
	}

}
