import foods from '../../assets/data/foods.json';
import NutrientGroups from '../../assets/data/nutrientGroups.json';

export default class FetchData {
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
			sums: [],
			individuals: {}
		};

		for (const groupName in NutrientGroups) {
			let relevantNutrients = [];
			const groupFilterData = NutrientGroups[groupName];
			const groups = groupFilterData.groups || [];
			const ids = groupFilterData.ids || {};
			const includedIds = ids.included || [];
			const excludedIds = ids.excluded || [];

			//find all nutrients that match filter criteria, and add to newNutrients
			for (const n of nutrients) {
				const nId = n.nutrient_id;

				//determine if nutrient matches filtering params
				if (typeof groupFilterData === 'number' && nId === groupFilterData) {
					relevantNutrients = n.value;
					break; //exit loop early, we have found the 1 relevant nutrient
				} else {
					const inGroup = !excludedIds.includes(nId) && (groups.includes(n.group) || includedIds.includes(nId));
					if (inGroup) relevantNutrients.push({
						id: nId,
						valPer100g: n.value,
						name: n.name
					})
				}
			}

			//add the discovered nutrients to relevant positions in newNutrients
			if (typeof relevantNutrients === 'number') {
				newNutrients.sums.push({
					name: groupName,
					val: relevantNutrients
				});
			} else {
				newNutrients.individuals[groupName] = relevantNutrients;
			}
		}

		console.log(newNutrients)

		for (const groupName in newNutrients.individuals) {
			const sum = newNutrients.individuals[groupName].reduce(function (total, nutrient) {
				return total + nutrient.valPer100g;
			}, 0);
			newNutrients.sums.push({
				name: groupName,
				val: sum
			});
		}
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
					x.nutrients = FetchData.GetRelevantNutrients(food.nutrients)
					return x;
				}
			}
			return x;
		})
	}

	//gets all data from FDA and prints JSON to console
	static async getFullNutritionInfo() {
		let data = foods;
		let ids = foods.map((x) => {
			return x.id;
		});

		//get nutrient info
		while (ids.length > 0) {
			const numRequestedIDS = Math.min(ids.length, 50);
			let fdaFoodInfo = await FetchData.getFDAData(ids.slice(0, numRequestedIDS));
			data = FetchData.MergeFoodsAndFDA(data, fdaFoodInfo); //merge info from foods.json
			//delete unneeded info
			ids = ids.slice(numRequestedIDS);
		}

		console.log(JSON.stringify(data))
		return data;
	}
}
