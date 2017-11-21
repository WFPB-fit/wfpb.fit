import oldNutritionData from '../../assets/data/nutrition.json';
import foods from '../../assets/data/foods.json';

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


	//gets all data from FDA and prints JSON to console
	static async getFullNutritionInfo() {
		let data = foods;
		let ids = foods.map((x) => {
			return x.id;
		});

		let mergeData = function (nutData, fdaData) {
			return nutData.map((x) => {
				for (const item of fdaData.foods) {
					console.log(item.food)
					if (item.food.desc.ndbno === x.id) {
						return Object.assign(x, item.food);
					}
				}
				return x;
			});
		}

		//get nutrient info
		while (ids.length > 0) {
			const numRequestedIDS = Math.min(ids.length, 50);
			let fdaFoodInfo = await FetchData.getFDAData(ids.slice(0, numRequestedIDS));
			console.log(fdaFoodInfo);
			mergeData(data, fdaFoodInfo);
			ids = ids.slice(numRequestedIDS);
		}

		console.log(JSON.stringify(data))
		return data;
	}

	static convertNutritionJson() { //convenience fn for transforming some of my data around
		const getSubStr = function (src, firstStr, lastStr) {
			const i = src.indexOf(firstStr);
			const q = src.indexOf(lastStr, i);
			return src.substring(i + firstStr.length, q);
		}

		const getId = function (src) {
			let id = getSubStr(src, 'qlookup=', '&');

			//some of the URLs don't have the ID right, handle special cases:
			if (id === 'egg') id = '01128';
			else if (id === '70%25') id = '13496';
			else if (id === '85%25') id = '23569';
			else if (id === 'ground+turkey') id = '05306';
			else if (id === 'chicken+breast') id = '05326';
			else if (id === '') {
				let show = getSubStr(src, 'show/', '?');
				if (show === '4529') id = '15047';
				else if (show === '4529') id = '15047';
				else if (show === '4522') id = '15040';
				else if (show === '4498') id = '15016';
			}
			return id;
		};

		let a = oldNutritionData.map((x) => {
			let id = getId(x.source);
			return {
				name: x.name.toLowerCase(),
				tags: x.tags,
				id: id,
				url:x.source
			}
		});
		console.log(JSON.stringify(a))
	}
}
