// import FoodData from '../assets/data/foods.json';
// import NutrientGroups from '../assets/data/nutrientGroups.json';

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

	// static GetRelevantNutrients(nutrients) {
	// 	let newNutrients = {};
	// 	let sums = {};
	// 	const nameSubstitutions = {
	// 		'Vitamin C, total ascorbic acid': 'Vitamin C',
	// 		'Vitamin D3 (cholecalciferol)': 'Vitamin D3',
	// 		'Vitamin K (phylloquinone)': 'Vitamin K',
	// 		'Choline, total': 'Choline',
	// 		'Folate, DFE': 'Folate',
	// 	}

	// 	for (const groupName in NutrientGroups) {
	// 		const groupFilterData = NutrientGroups[groupName];
	// 		const groups = groupFilterData.groups || [];
	// 		const ids = groupFilterData.ids || {};
	// 		const includedIds = ids.included || [];
	// 		const excludedIds = ids.excluded || [];

	// 		//find all nutrients that match filter criteria, and add to newNutrients
	// 		for (const n of nutrients) {
	// 			const nId = n.nutrient_id;
	// 			let amount = n.value;
	// 			if (n.unit === 'mg') amount /= 1000;
	// 			else if (n.unit === 'µg') amount /= 1000000;

	// 			//determine if nutrient matches filtering params
	// 			if (typeof groupFilterData === 'number' && nId === groupFilterData) {
	// 				sums[groupName] = amount;
	// 				break; //exit loop early, we have found the 1 relevant nutrient
	// 			} else if (!excludedIds.includes(nId) && (groups.includes(n.group) || includedIds.includes(nId))) {
	// 				let nutrs = newNutrients[groupName] || {};
	// 				let name = nameSubstitutions[n.name] || n.name
	// 				nutrs[name] = Number(amount.toPrecision(5)); //cut down on final, transmitted data size by limiting to only most siginificant values
	// 				newNutrients[groupName] = nutrs;
	// 			}
	// 		}
	// 	}

	// 	//transform data for easier manipulation
	// 	sums.trans = sums.trans || 0;
	// 	// const totalFat = sums.saturated + sums.monounsaturated + sums.polyunsaturated + sums.trans;
	// 	//reduce complex nutrients into a single sum
	// 	let carotenoids = FdaApi.ReduceComplexNutrientsToSum(newNutrients, 'carotenoids');
	// 	let flavonoids = FdaApi.ReduceComplexNutrientsToSum(newNutrients, 'flavonoids');
	// 	let omega3 = FdaApi.ReduceComplexNutrientsToSum(newNutrients, 'omega3');

	// 	//manually reduce complex nutrients
	// 	const v = newNutrients.vitamins;
	// 	const vitaminE = v['Vitamin E (alpha-tocopherol)'] + v['Tocopherol, beta'] + v['Tocopherol, delta'] + v['Tocopherol, gamma'];
	// 	if (vitaminE) {
	// 		v['Vitamin E'] = vitaminE;
	// 		delete v['Vitamin E (alpha-tocopherol)'];
	// 		delete v['Tocopherol, beta'];
	// 		delete v['Tocopherol, delta'];
	// 		delete v['Tocopherol, gamma'];
	// 	};
	// 	delete v['Folate, food']; //Folate,food is same as Folate, DFE which was already included

	// 	//arrange data for consumption
	// 	newNutrients.energy = {
	// 		Protein: sums.protein,
	// 		Carbs: sums.carbs,
	// 		// fat: totalFat,
	// 		SAFA: sums.saturated,
	// 		MUFA: sums.monounsaturated,
	// 		PUFA: sums.polyunsaturated,
	// 		Trans: sums.trans,
	// 		Omega3: omega3,
	// 	};
	// 	newNutrients.misc = {
	// 		Cholesterol: sums.cholesterol,
	// 		Fiber: sums.fiber,
	// 		Carotenoids: carotenoids,
	// 		Flavonoids: flavonoids
	// 	};

	// 	//create defaults for potentially missing data
	// 	newNutrients.amino = newNutrients.amino || {};
	// 	newNutrients.vitamins = newNutrients.vitamins || {};
	// 	newNutrients.minerals = newNutrients.minerals || {};

	// 	//finally, turn the big array into an indexed hash
	// 	return newNutrients;
	// }

	static formatFdaIds(ids) {
		return ids.map(id => {
			return (id + "").padStart(5, '0');
		});
	}

	//gets all data from FDA
	static async fetchFoodsInfo(ids) {
		console.log('Fetching FDA Nutrition Data')
		ids = ["11530", "1003"] //Object.keys(FoodData);

		//get nutrient info
		//can only request up to 50 foods at a time, so send one request for each 50 food ids
		let requests = [];
		while (ids.length > 0) {
			const numRequestedIDS = Math.min(ids.length, 50);
			let reqIds = ids.slice(0, numRequestedIDS);
			reqIds = FdaApi.formatFdaIds(reqIds);
			requests.push(FdaApi.getFDAData(reqIds));
			ids = ids.slice(numRequestedIDS); //remove the reqIds
		}

		//format responses to return the food objects
		const foodDataResponses = await Promise.all(requests);
		let foods = [];
		for (const fdaResponse of foodDataResponses) {
			for (const f of fdaResponse.foods) {
				foods.push(f.food)
			}
		}
		return foods;
	}
}
