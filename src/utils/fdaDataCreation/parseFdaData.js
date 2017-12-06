import FoodIds from '../../assets/data/nutrition/foodIds.json';
import { CustomNutrientNames, ImportantNutrients } from '../../assets/data/importantNutrients.js';
// import ServingSizes from '../../assets/data/nutrition/servingSizes.json';
import FdaApi from './FdaApi.js';

export default class ParseFdaData {
	static index(arr) {
		return arr.reduce((total, curr) => {
			const foodId = curr[0];
			const val = curr[1];
			total[foodId] = val;
			return total;
		}, {});
	}

	static cleanUpGroupNutrients(n) {

	}

	static getNutrients(fdaFood) {
		let nutrients = {};
		let groupNames = Object.keys(ImportantNutrients);

		//add each group to the return value
		for (const groupName of groupNames) {
			let groupNutrients = {};
			//for each nutrient in this group, add its FDA value to return value
			for (let nutrientId of ImportantNutrients[groupName]) {
				const n = fdaFood.nutrients.filter(x => x.nutrient_id === nutrientId); //find the nutrient
				if (n.length === 1) groupNutrients[nutrientId] = n[0].value;
			}
			nutrients[groupName] = groupNutrients;
		}

		return nutrients;
	}

	static addNutrientNames(food, nutrients) {
		for (const n of food.nutrients) {
			let name = n.name;

			if (n.nutrient_id in CustomNutrientNames) name = CustomNutrientNames[n.nutrient_id];
			nutrients[n.nutrient_id] = name;
		}
	}

	static async parse() {
		// const servings = ParseSqlOutput.index(ServingSizes);
		// const foods = ParseSqlOutput.index(FoodNames);
		// const nUnits = ParseSqlOutput.index(NutrientUnits);
		// const nutrients = ParseSqlOutput.index(NutrientNames);
		// const amounts = ParseSqlOutput.processAmounts(Amt);
		const ids = FoodIds.map(x => x[0]);
		const fdaFoods = await FdaApi.fetchFoodsInfo(ids);
		let foods = [];
		console.log(fdaFoods)
		let nutrientNames = {};
		//extract info from the foods API
		for (const fdaFood of fdaFoods) {
			let food = {};
			ParseFdaData.addNutrientNames(fdaFood, nutrientNames);

			food.name = fdaFood.desc.name;
			food.nutrients = ParseFdaData.getNutrients(fdaFood);
			foods.push(food);
		}
		console.log(foods)
		console.log(nutrientNames)


		// console.log(JSON.stringify(nUnits)); //note this may add a " character to the beginning and end when printing to the console
	}
}
