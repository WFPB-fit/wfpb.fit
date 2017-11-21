import FullNutritionInfo from '../assets/data/nutrition/fullNutritionInfo.json';

export default class CleanData {
	static normalizeNutrientTo100g(nutrient) {
		const m = nutrient.measures[0];
		let eqv = m.eqv;
		if (m.eunit !== 'g') {
			console.error('Not grams, actually ' + m.eunit);
		}
		return 100 / (m.eqv / m.value);
	}
	getSumNutrientGroup(food, groupName) {
		return food.nutrients.reduce(function (accumulator, currNutrient) {
			let currentValue = 0;
			if (currNutrient.group === groupName) currentValue = CleanData.normalizeNutrient(currNutrient);
			return accumulator + currentValue;
		}.bind(this));
	}
}
