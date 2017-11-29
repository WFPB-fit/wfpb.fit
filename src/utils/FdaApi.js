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
			return response.json(); //this takes a long time
		})
	}

	static ReduceComplexNutrientsToSum(foodData, nutrientKey) {
		const sumNutrients = function (total, nutrientVal) {
			return total + nutrientVal;
		}

		//reduce complex nutrients into a single sum
		let nutrients = foodData[nutrientKey] || {};
		nutrients = Object.values(nutrients).reduce(sumNutrients, 0);
		delete foodData[nutrientKey];

		return nutrients;
	}

	static GetRelevantNutrients(nutrients) {
		let newNutrients = {};
		let sums = {};
		const nameSubstitutions = {
			'Vitamin C, total ascorbic acid': 'Vitamin C',
			'Vitamin D3 (cholecalciferol)': 'Vitamin D3',
			'Vitamin K (phylloquinone)': 'Vitamin K',
			'Choline, total': 'Choline',
			'Folate, DFE': 'Folate',
		}

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
					let nutrs = newNutrients[groupName] || {};
					let name = nameSubstitutions[n.name] || n.name
					nutrs[name] = Number(amount.toPrecision(5)); //cut down on final, transmitted data size by limiting to only most siginificant values
					newNutrients[groupName] = nutrs;
				}
			}
		}

		//transform data for easier manipulation
		sums.trans = sums.trans || 0;
		// const totalFat = sums.saturated + sums.monounsaturated + sums.polyunsaturated + sums.trans;
		//reduce complex nutrients into a single sum
		let carotenoids = FdaApi.ReduceComplexNutrientsToSum(newNutrients, 'carotenoids');
		let flavonoids = FdaApi.ReduceComplexNutrientsToSum(newNutrients, 'flavonoids');
		let omega3 = FdaApi.ReduceComplexNutrientsToSum(newNutrients, 'omega3');

		//manually reduce complex nutrients
		const v = newNutrients.vitamins;
		const vitaminE = v['Vitamin E (alpha-tocopherol)'] + v['Tocopherol, beta'] + v['Tocopherol, delta'] + v['Tocopherol, gamma'];
		if (vitaminE) {
			v['Vitamin E'] = vitaminE;
			delete v['Vitamin E (alpha-tocopherol)'];
			delete v['Tocopherol, beta'];
			delete v['Tocopherol, delta'];
			delete v['Tocopherol, gamma'];
		};
		delete v['Folate, food']; //Folate,food is same as Folate, DFE which was already included

		//arrange data for consumption
		newNutrients.energy = {
			Protein: sums.protein,
			Carbs: sums.carbs,
			// fat: totalFat,
			SAFA: sums.saturated,
			MUFA: sums.monounsaturated,
			PUFA: sums.polyunsaturated,
			Trans: sums.trans,
			Omega3: omega3,
		};
		newNutrients.misc = {
			Cholesterol: sums.cholesterol,
			Fiber: sums.fiber,
			Carotenoids: carotenoids,
			Flavonoids: flavonoids
		};

		//create defaults for potentially missing data
		newNutrients.amino = newNutrients.amino || {};
		newNutrients.vitamins = newNutrients.vitamins || {};
		newNutrients.minerals = newNutrients.minerals || {};

		//finally, turn the big array into an indexed hash
		return newNutrients;
	}

	static MergeFoodsAndFDA(foodsData, FDA) {
		return FDA.map(fdaFoodItem => {
			const fdaFood = fdaFoodItem.food;
			const id = fdaFood.desc.ndbno;
			const customFoodDesc = foodsData[id];
			return {
				name: fdaFood.desc.name,
				nutrients: FdaApi.GetRelevantNutrients(fdaFood.nutrients),
				src: `https://ndb.nal.usda.gov/ndb/search/list?qlookup=${id}`,
			}
		});
	}

	//gets all data from FDA and prints JSON to console
	static async getFullNutritionInfo() {
		console.log('Fetching FDA Nutrition Data')
		let ids = Object.keys(foods);

		//get nutrient info
		//can only request up to 50 foods at a time, so send one request for each 50 food ids
		let requests = [];
		while (ids.length > 0) {
			const numRequestedIDS = Math.min(ids.length, 50);
			requests.push(FdaApi.getFDAData(ids.slice(0, numRequestedIDS)));
			ids = ids.slice(numRequestedIDS);
		}
		const foodData = await Promise.all(requests);

		//merge info from foods.json
		let data = [];
		for (const foodResults of foodData) {
			const finalFoodObjs = FdaApi.MergeFoodsAndFDA(foods, foodResults.foods);
			data = data.concat(finalFoodObjs);
		}

		console.log(JSON.stringify(data))
		return data;
	}
}
