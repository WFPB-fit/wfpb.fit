import FoodIds from '../../assets/data/nutrition/foodIds.json';
import FoodData from '../../assets/data/nutrition/foodData.json';
import FoodGroups from '../../assets/data/nutrition/foodGroups.json'; //array of [foodName, groupName, foodId]
import pluralize from 'pluralize';
import {
	ImportantNutrients,
	NutrientSummationReductions,
	FoodGroupIdIndex
} from '../../assets/data/ImportantNutrients.js';
import {
	getNutrientFromId,
	titleize,
	objSwap
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
		let importantNutrients = Object.values(ImportantNutrients);

		//add each nutrient from importantNutrients to the return value
		for(const nutrientGroup of importantNutrients){
			for (const nId of nutrientGroup){
				const n = getNutrientFromId(nId, fdaFood.nutrients);

				if (n) {
					let val = ParseFdaData.getNutrientValue(n);
					nutrients[nId] = Number(val.toPrecision(4));
				}
			}
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

	static async parse(store) {
		//get Food info from FDA API
		const ids = FoodIds.map(x => x[0]);
		const fdaFoods = await FdaApi.fetchFoodsInfo(ids);
		ParseFdaData.preprocessNutrientsToSummations(fdaFoods);
		console.log(fdaFoods)

		//extract info from the foods API
		let foods = {};
		// NEED TO SOMEHOW ENSURE THAT store's food group ids are loaded in time
		// Should be fine since this is run manually on localhost, thus I don't care for now
		const fgNameIndex = objSwap(FoodGroupIdIndex);
		for (const fdaFood of fdaFoods) {
			let food = {};
			// ParseFdaData.addNutrientNames(fdaFood, nutrientNames);

			const id = fdaFood.desc.ndbno;
			food.name = fdaFood.desc.name;			
			food.fg = fgNameIndex[fdaFood.desc.fg]; //food group
			food.n = ParseFdaData.getNutrients(fdaFood);
			foods[id] = food;
		}
		console.log(foods)
		// console.log(nutrientNames)


		console.log(JSON.stringify(foods)); //note this may add a " character to the beginning and end when printing to the console
		// console.log(JSON.stringify(nutrientNames)); //note this may add a " character to the beginning and end when printing to the console
	}
}
