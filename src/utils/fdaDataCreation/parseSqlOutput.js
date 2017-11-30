import Amt from '../../assets/data/nutrition/sql/amount.json';
import FoodNames from '../../assets/data/nutrition/sql/foodNames.json';
import NutrientNames from '../../assets/data/nutrition/sql/nutrients.json';
import NutrientUnits from '../../assets/data/nutrition/sql/nutrientUnits.json';
import ServingSizes from '../../assets/data/nutrition/sql/servingSizes.json';

export default class ParseSqlOutput {
	static index(arr) {
		return arr.reduce((total, curr) => {
			const foodId = curr[0];
			const val = curr[1];
			total[foodId] = val;
			return total;
		}, {});
	}
	static processAmounts(arr) {
		const carotenoids = [
			"321", "322", //carotene
			"334", //Cryptoxanthin
			"337", //Lycopene
			"338", //Lutein + zeaxanthin
		];
		const sterols = [
			"601", // "Cholesterol",
			"636", // "Phytosterols",
			"638", //"Stigmasterol",
			"639", // "Campesterol",
			"641", // "Beta-sitosterol",
		];
		const overview = [
			"203", //protein
			"291", //fiber
			"205", //carb
			"605", //"Fatty acids, total trans",
			"606", //"Fatty acids, total saturated",
			"645", //"Fatty acids, total monounsaturated",
			"646", //"Fatty acids, total polyunsaturated",
		];
		const omega3 = [
			"851", // "18:3 n-3 c,c,c (ALA)"
			"621", // "22:6 n-3 (DHA)",
			"629", // "20:5 n-3 (EPA)",
			"631", // "22:5 n-3 (DPA)",
		];
		const amino = [
			"454", // "Betaine",
			"501", // "Tryptophan",
			"502", // "Threonine",
			"503", // "Isoleucine",
			"504", // "Leucine",
			"505", // "Lysine",
			"506", // "Methionine",
			"507", // "Cystine",
			"508", // "Phenylalanine",
			"509", // "Tyrosine",
			"510", // "Valine",
			"511", // "Arginine",
			"512", // "Histidine",
			"513", // "Alanine",
			"514", // "Aspartic acid",
			"515", // "Glutamic acid",
			"516", // "Glycine",
			"517", // "Proline",
			"518", // "Serine",
			"521", // "Hydroxyproline",
		];
		const minerals = [
			"301", // "Calcium, Ca",
			"303", // "Iron, Fe",
			"304", // "Magnesium, Mg",
			"305", // "Phosphorus, P",
			"306", // "Potassium, K",
			"307", // "Sodium, Na",
			"309", // "Zinc, Zn",
			"312", // "Copper, Cu",
			"313", // "Fluoride, F",
			"315", // "Manganese, Mn",
			"317", // "Selenium, Se",
		];
		const vitamins = [
			//"318", // "Vitamin A, IU",
			// "573", // "Vitamin E, added",
			// "578", // "Vitamin B-12, added",
			"319", // "Retinol",
			// "320", // "Vitamin A, RAE",
			"321", // "Carotene, beta",
			"322", // "Carotene, alpha",
			"323", // "Vitamin E (alpha-tocopherol)",
			"324", // "Vitamin D",
			"325", // "Vitamin D2 (ergocalciferol)",
			"326", // "Vitamin D3 (cholecalciferol)",
			"328", // "Vitamin D (D2 + D3)",
			"334", // "Cryptoxanthin, beta",
			"337", // "Lycopene",
			"338", // "Lutein + zeaxanthin",
			"341", // "Tocopherol, beta",
			"342", // "Tocopherol, gamma",
			"343", // "Tocopherol, delta",
			"344", // "Tocotrienol, alpha",
			"345", // "Tocotrienol, beta",
			"346", // "Tocotrienol, gamma",
			"347", // "Tocotrienol, delta",
			"401", // "Vitamin C, total ascorbic acid",
			"404", // "Thiamin",
			"405", // "Riboflavin",
			"406", // "Niacin",
			"410", // "Pantothenic acid",
			"415", // "Vitamin B-6",
			"417", // "Folate, total",
			"418", // "Vitamin B-12",
			"421", // "Choline, total",
			"428", // "Menaquinone-4",
			"429", // "Dihydrophylloquinone",
			"430", // "Vitamin K (phylloquinone)",
			"431", // "Folic acid",
			"432", // "Folate, food",
			"435", // "Folate, DFE"
		];
		//index the amount of nutrients
		let amounts = Amt.reduce((total, curr) => {
			const foodId = curr[0];
			const nutrientId = curr[2];
			const amt = curr[1];
			const foodIsNew = !(foodId in total);
			if (foodIsNew) total[foodId] = {};
			total[foodId][nutrientId] = amt;
			return total;
		}, {});

		const getNutrientAmountsAsNewObj = function (nutrientIds, nutrientAmounts) {
			return nutrientIds.reduce((total, id) => {
				total[id] = nutrientAmounts[id];
				return total;
			}, {});
		};

		amounts = Object.keys(amounts).map(id => {
			const nutrients = amounts[id];
			const nIds = Object.keys(nutrients);
			const newNutrients = {
				carotenoids: getNutrientAmountsAsNewObj(carotenoids, nutrients)
			};
			return newNutrients;
		});

		return amounts;
	}
	static parse() {
		const servings = ParseSqlOutput.index(ServingSizes);
		const foods = ParseSqlOutput.index(FoodNames);
		const nUnits = ParseSqlOutput.index(NutrientUnits);
		const nutrients = ParseSqlOutput.index(NutrientNames);
		const amounts = ParseSqlOutput.processAmounts(Amt);


		console.log(JSON.stringify(nUnits)); //note this may add a " character to the beginning and end when printing to the console
	}
}
