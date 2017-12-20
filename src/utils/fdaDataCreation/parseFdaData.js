import FoodIds from '../../assets/data/nutrition/foodIds.json';
import FoodData from '../../assets/data/nutrition/foodData.json';
import { ImportantNutrients, NutrientSummationReductions } from '../../assets/data/importantNutrients.js';
// import ServingSizes from '../../assets/data/nutrition/servingSizes.json';
import FdaApi from './FdaApi.js';

export default class ParseFdaData {
	//get a specific nutrient from the FDA nutrient array
	static getNutrientFromId(id, nutrients) {
		const n = nutrients.filter(x => x.nutrient_id == id); //find the nutrient. use '==' as one may be string and other integer
		return (n.length === 1) ? n[0] : null;
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
				const n = ParseFdaData.getNutrientFromId(nutrientId, fdaFood.nutrients);
				if (n) {
					let val = n.value;
					if (n.unit === 'µg') val *= 1e-6;
					else if (n.unit === 'mg') val *= 1e-3;

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
			for (const food of fdaFoods) {

				const summationIds = NutrientSummationReductions[nId].concat(nId); //get all the nutrients needed in the sum, add the placeholders value too
				let sum = 0;
				for (const nutrientIdToSum of summationIds) { //iterate over each required summation nutrient, adding up its value
					const n = ParseFdaData.getNutrientFromId(nutrientIdToSum, food.nutrients);
					if (n) sum += n.value;
				}

				//if values were summed, set the placeholder's nutrient value to the total sum
				if (sum > 0) {
					food.nutrients[nId] = food.nutrients[nId] || {}; //nutrient may not be in fetched FDA data, so create it as a new object. This will be missing all other nutrient data besides what's below
					food.nutrients[nId].value = sum;
				}
			}
		}
	}

	static async parse() {
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