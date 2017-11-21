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

	static normalizeNutrientTo100g(nutrient) {
		const m = nutrient.measures[0];
		let eqv = m.eqv;
		if (m.eunit !== 'g') {
			console.error('Not grams, actually ' + m.eunit);
		}
		return 100 / (m.eqv / m.value);
	}


	getSumNutrients(food, ids) {
		return food.nutrients.reduce(function (accumulator, currNutrient) {
			let currentValue = 0;
			const id = currNutrient.nutrient_id;
			const idInIdsArray = Array.isArray(ids) && ids.includes(currNutrient.nutrient_id);
			const idInIdsObj = ids.min && ids.max && id >= ids.min && id <= ids.max;
			if (idInIdsArray || idInIdsObj) currentValue = currNutrient.amount;
			return accumulator + currentValue;
		}.bind(this));
	}

	static MergeFoodsAndFDA(foodsData, FDA) {
		return foodsData.map((x) => {
			//find corresponding FDA food for each foodsData food, if it exists
			for (const item of FDA.foods) {
				const food = item.food;
				console.log(food)
				// console.log(JSON.stringify(food))
				if (food.desc.ndbno === x.id) {
					let newFood = x;
					// newFood = Object.assign(newFood, item.food); //merge all FDA data
					//only copy over the nutrients data, and only some of the nutrients data
					for (let i = 0; i < food.nutrients.length; i++) {
						let n = food.nutrients[i];
						const normalizedMeasure = FetchData.normalizeNutrientTo100g(n);
						delete n.measures;
						n.amount = normalizedMeasure;
					}
					newFood = Object.assign(newFood, food.nutrients);
					return newFood;
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
