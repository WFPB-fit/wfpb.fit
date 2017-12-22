import FoodIds from '../../assets/data/nutrition/foodIds.json';
import FoodData from '../../assets/data/nutrition/foodData.json';
import FoodGroups from '../../assets/data/nutrition/foodGroups.json'; //array of [foodName, groupName, foodId]
import pluralize from 'pluralize';
import {
	ImportantNutrients,
	NutrientSummationReductions
} from '../../assets/data/importantNutrients.js';
import {
	getNutrientFromId,
	titleize
} from '../GeneralUtils.jsx';
import FdaApi from './FdaApi.js';

export default class ParseFdaData {


	static getNutrientValue(n) {
		let val = n.value;
		if (n.unit === 'µg') val *= 1e-6;
		else if (n.unit === 'mg') val *= 1e-3;
		return val;
	}

	//extract important nutrients from the FDA API data
	static getNutrients(fdaFood) {
		let nutrients = {};
		let groupNames = Object.keys(ImportantNutrients);

		//add each group to the return value
		for (const groupName of groupNames) {
			let groupNutrients = {};
			//for each nutrient in this group, add its FDA value to return value
			for (let nutrientId of ImportantNutrients[groupName]) {
				const n = getNutrientFromId(nutrientId, fdaFood.nutrients);

				if (n) {
					let val = ParseFdaData.getNutrientValue(n);

					const formatted = Number(val.toPrecision(4));
					groupNutrients[nutrientId] = formatted;
				}
			}
			nutrients[groupName] = groupNutrients;
		}

		return nutrients;
	}

	//add each nutrient's name to the total nutrient name object
	static addNutrientNames(food, nutrients) {
		for (const n of food.nutrients) {
			let name = n.name;

			nutrients[n.nutrient_id] = name;
		}
	}

	//sum nutrients are broken into multiple but are basically the same, ie tocopherols and tocotriols. Add all those ones together.
	static preprocessNutrientsToSummations(fdaFoods) {
		const nIds = Object.keys(NutrientSummationReductions);
		for (const nId of nIds) {
			for (let food of fdaFoods) {
				const summationIds = NutrientSummationReductions[nId].concat(nId); //get all the nutrients needed in the sum, add the placeholders value too
				let sum = 0;
				for (const nutrientIdToSum of summationIds) { //iterate over each required summation nutrient, adding up its value
					const n = getNutrientFromId(nutrientIdToSum, food.nutrients);
					if (n) sum += ParseFdaData.getNutrientValue(n);

				}

				//if values were summed, set the placeholder's nutrient value to the total sum
				if (sum > 0) {
					const n = getNutrientFromId(nId, food.nutrients);
					if (n) n.value = sum
					else {
						food.nutrients.push({ // add the nutrient summation into the food under the label nutrient
							nutrient_id: nId,
							value: sum
						});
					}
				}
			}
		}
	}

	static preprocessFoodFilter(filterName) {
		filterName = titleize(filterName);
		filterName = pluralize.singular(filterName);
		filterName = filterName.trim();
		return filterName;
	}
	static parseIndicies() {
		let foodIndex = {};
		for (const food of FoodGroups) {
			const [foodName, groupName, foodId] = food;
			const foodFilters = foodName.split(',');

			//add group to total food index if needed. Set top level index of this food to the group
			if (!(groupName in foodIndex)) foodIndex[groupName] = {};
			let prevIndex = foodIndex[groupName];

			//iterate over each of the food's filters, indexing on each
			for (let i = 0; i < foodFilters.length; i++) {
				const filter = ParseFdaData.preprocessFoodFilter(foodFilters[i]);
				if (!(filter in prevIndex)) prevIndex[filter] = {}; //add index if not present
				prevIndex = prevIndex[filter];
				if (i === (foodFilters.length - 1)) prevIndex[''] = foodId;
			}
		}
		return foodIndex;
	}

	static async parse() {
		const indexedFoodNames = ParseFdaData.parseIndicies();
		console.log(JSON.stringify(indexedFoodNames));

		//get Food info from FDA API
		const ids = FoodIds.map(x => x[0]);
		const fdaFoods = await FdaApi.fetchFoodsInfo(ids);
		ParseFdaData.preprocessNutrientsToSummations(fdaFoods);
		console.log(fdaFoods)

		//extract info from the foods API
		let foods = {};
		// let nutrientNames = {};
		for (const fdaFood of fdaFoods) {
			let food = {};
			// ParseFdaData.addNutrientNames(fdaFood, nutrientNames);

			const id = fdaFood.desc.ndbno;
			food.name = fdaFood.desc.name;
			food.nutrients = ParseFdaData.getNutrients(fdaFood);
			foods[id] = food;
		}
		console.log(foods)
		// console.log(nutrientNames)


		console.log(JSON.stringify(foods)); //note this may add a " character to the beginning and end when printing to the console
		// console.log(JSON.stringify(nutrientNames)); //note this may add a " character to the beginning and end when printing to the console
	}
}
