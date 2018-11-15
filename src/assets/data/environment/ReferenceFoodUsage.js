//currently these are just guesses, need better data
export default [
	{
		label: "vegan",
		data: {
			Sugar: 10,
			Rice: 5,
			"Mustard/Rape-seed oil": 5,
			"Soybean oil": 5,
			"Sunflowerseed oil": 5,
			Maize: 5,
			"Roots and tubers": 15,
			Wheat: 5,
			"Fruits and vegetables": 15,
			Nuts: 15,
			Pulses: 15,
			Pork: 0,
			Eggs: 0,
			"Fish (farmed)": 0,
			Poultry: 0,
			Dairy: 0,
			"Sheep and goat": 0,
			Beef: 0
		}
	},
	{
		label: "vegetarian",
		data: {
			Sugar: 10,
			Rice: 5,
			"Mustard/Rape-seed oil": 5,
			"Soybean oil": 5,
			"Sunflowerseed oil": 5,
			Maize: 5,
			"Roots and tubers": 10,
			Wheat: 5,
			"Fruits and vegetables": 10,
			Nuts: 10,
			Pulses: 10,
			Pork: 0,
			Eggs: 8,
			"Fish (farmed)": 0,
			Poultry: 0,
			Dairy: 12,
			"Sheep and goat": 0,
			Beef: 0
		}
	},
	{
		label: "american", //2010 USDA ERS - Food availability per capita - Calories Loss-Adjusted Food Availability- Doesn't use the same groupings, so this is still just guessing - https://www.ers.usda.gov/data-products/food-availability-per-capita-data-system/food-availability-per-capita-data-system/#Food Availability
		data: {
			Sugar: 10,
			Rice: 6,
			"Mustard/Rape-seed oil": 7,
			"Soybean oil": 7,
			"Sunflowerseed oil": 7,
			Maize: 10,
			"Roots and tubers": 2,
			Wheat: 9,
			"Fruits and vegetables": 4,
			Nuts: 1,
			Pulses: 2,
			Pork: 3,
			Eggs: 3,
			"Fish (farmed)": 4,
			Poultry: 4,
			Dairy: 11,
			"Sheep and goat": 3,
			Beef: 7
		}
	},
	{
		label: "Meat Lover",
		data: {
			Sugar: 0,
			Rice: 0,
			"Mustard/Rape-seed oil": 5,
			"Soybean oil": 5,
			"Sunflowerseed oil": 5,
			Maize: 0,
			"Roots and tubers": 5,
			Wheat: 0,
			"Fruits and vegetables": 5,
			Nuts: 5,
			Pulses: 5,
			Pork: 8,
			Eggs: 10,
			"Fish (farmed)": 8,
			Poultry: 12,
			Dairy: 8,
			"Sheep and goat": 8,
			Beef: 11
		}
	}
];
