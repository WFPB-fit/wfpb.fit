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

	static formatFdaIds(ids) {
		return ids.map(id => {
			return (id + "").padStart(5, '0');
		});
	}

	//gets all data from FDA
	static async fetchFoodsInfo(ids) {
		console.log('Fetching FDA Nutrition Data')
		// ids = ["11530", "1003"] //Object.keys(FoodData);

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
