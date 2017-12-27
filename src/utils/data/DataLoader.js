import {
	combineReducers
} from 'redux'

export default class DataLoader {
	static async init(store) {
		DataLoader.store = store;

		DataLoader.loadFoodGroups();
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
			} = await DataLoader.getFoodGroupIdRawData();
			idIndex = {};
			for (const [id, name] of FoodGroupIds) {
				idIndex[id] = name;
			}
			localStorage.setItem('fgIdIndex', JSON.stringify(idIndex));
		}

		if (!nameIndex) {
			const {
				FoodGroupIds
			} = await DataLoader.getFoodGroupIdRawData();

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
	}

	static async getFoodGroupIdRawData() {
		if (!DataLoader.foodGroupIds) {
			DataLoader.foodGroupIds = await
			import ('../../assets/data/importantNutrients.js');
		}
		return DataLoader.foodGroupIds;
	}
	static async getNutrientsRawData() {
		if (!DataLoader.nutrients) {
			DataLoader.nutrients = await
			import ('../../assets/data/nutrition/foodData.json');
		}
		return DataLoader.nutrients;
	}

}
