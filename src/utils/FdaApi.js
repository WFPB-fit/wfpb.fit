import foods from '../assets/data/foods.json';
import NutrientGroups from '../assets/data/nutrientGroups.json';

export default class FdaApi {
	static async getFDAData(foods, filepath = '../../assets/data/food_nutrients.json') {
		const key = 'PwVSjgNYYAwZ9M4txUxNlFjh44kCgQcrhPPR4X8c';
		const type = 'f'; //f for full, b for basic
		foods = foods.map(function (x) {
			return 'ndbno=' + x;
		}).join('&');
		const url = `https://api.nal.usda.gov/ndb/V2/reports?${foods}&type=${type}&api_key=${key}`

		return fetch(url, {
			mode: 'cors',
			header: new Headers({
				'Content-Type': 'application/json'
			}),
		}).then(response => {
			return response.json()
		})
	}

	static GetRelevantNutrients(nutrients) {
		let newNutrients = {
			individuals: {}
		};
		let sums = {};

		for (const groupName in NutrientGroups) {
			const groupFilterData = NutrientGroups[groupName];
			const groups = groupFilterData.groups || [];
			const ids = groupFilterData.ids || {};
			const includedIds = ids.included || [];
			const excludedIds = ids.excluded || [];

			//find all nutrients that match filter criteria, and add to newNutrients
			for (const n of nutrients) {
				const nId = n.nutrient_id;
				let amount = n.value;
				if (n.unit === 'mg') amount /= 1000;
				else if (n.unit === 'µg') amount /= 1000000;

				//determine if nutrient matches filtering params
				if (typeof groupFilterData === 'number' && nId === groupFilterData) {
					sums[groupName] = amount;
					break; //exit loop early, we have found the 1 relevant nutrient
				} else if (!excludedIds.includes(nId) && (groups.includes(n.group) || includedIds.includes(nId))) {
					let arr = newNutrients.individuals[groupName] || [];
					arr.push({
						id: nId,
						valPer100g: amount,
						name: n.name
					});
					newNutrients.individuals[groupName] = arr;
				}
			}
		}

		//transform data for easier manipulation
		sums.trans = sums.trans || 0;
		const totalFat = sums.saturated + sums.monounsaturated + sums.polyunsaturated + sums.trans;
		const sumNutrients = function (total, nutrient) {
			return total + nutrient.valPer100g;
		}
		let carotenoids = newNutrients.individuals.carotenoids || [];
		carotenoids = carotenoids.reduce(sumNutrients, 0);
		delete newNutrients.individuals.carotenoids;
		let flavonoids = newNutrients.individuals.carotenoids || [];
		flavonoids = flavonoids.reduce(sumNutrients, 0);
		delete newNutrients.individuals.flavonoids;

		//arrange data for consumption
		let omega3 = newNutrients.individuals.omega3 || [];
		newNutrients.fats = {
			saturated: sums.saturated,
			monounsaturated: sums.monounsaturated,
			polyunsaturated: sums.polyunsaturated,
			trans: sums.trans,
			omega3: omega3.reduce(sumNutrients, 0),
		};
		newNutrients.energy = {
			protein: sums.protein,
			carbs: sums.carbs,
			fat: totalFat,
		};
		newNutrients.misc = {
			cholesterol: sums.cholesterol,
			fiber: sums.fiber,
			carotenoids: carotenoids,
			flavonoids: flavonoids
		};
		// newNutrients.fats = [{
		// 		name: 'saturated',
		// 		valPer100g: sums.saturated
		// 	},
		// 	{
		// 		name: 'monounsaturated',
		// 		valPer100g: sums.monounsaturated
		// 	},
		// 	{
		// 		name: 'polyunsaturated',
		// 		valPer100g: sums.polyunsaturated
		// 	},
		// 	{
		// 		name: 'omega3',
		// 		valPer100g: omega3.reduce(sumNutrients, 0)
		// 	},
		// 	{
		// 		name: 'trans',
		// 		valPer100g: sums.trans
		// 	}
		// ];
		// newNutrients.energy = [
		// 	// {
		// 	// 	name: 'calories',
		// 	// 	valPer100g: sums.calories
		// 	// },
		// 	{
		// 		name: 'protein',
		// 		valPer100g: sums.protein
		// 	},
		// 	{
		// 		name: 'carbohydrates',
		// 		valPer100g: sums.carbs
		// 	},
		// 	{
		// 		name: 'fat',
		// 		valPer100g: totalFat
		// 	},
		// ];
		// newNutrients.misc = [{
		// 		name: 'cholesterol',
		// 		valPer100g: sums.cholesterol
		// 	},
		// 	{
		// 		name: 'fiber',
		// 		valPer100g: sums.fiber
		// 	},
		// 	{
		// 		name: 'carotenoids',
		// 		valPer100g: carotenoids
		// 	},
		// 	{
		// 		name: 'flavonoids',
		// 		valPer100g: flavonoids
		// 	},
		// ];

		//finally, turn the big array into an indexed hash
		return newNutrients;
	}

	static MergeFoodsAndFDA(foodsData, FDA) {
		return foodsData.map((x) => {
			//find corresponding FDA food for each foodsData food, if it exists
			for (const item of FDA.foods) {
				const food = item.food;
				// console.log(food)
				// console.log(JSON.stringify(food))
				if (food.desc.ndbno === x.id) {
					x.nutrients = FdaApi.GetRelevantNutrients(food.nutrients)
					return x;
				}
			}
			return x;
		})
	}

	//gets all data from FDA and prints JSON to console
	static async getFullNutritionInfo() {
		console.log('Fetching FDA Nutrition Data')
		let data = foods;
		let ids = foods.map((x) => {
			return x.id;
		});

		//get nutrient info
		while (ids.length > 0) {
			const numRequestedIDS = Math.min(ids.length, 50);
			let fdaFoodInfo = await FdaApi.getFDAData(ids.slice(0, numRequestedIDS));
			data = FdaApi.MergeFoodsAndFDA(data, fdaFoodInfo); //merge info from foods.json
			//delete unneeded info
			ids = ids.slice(numRequestedIDS);
		}

		console.log(JSON.stringify(data))
		return data;
	}
}
