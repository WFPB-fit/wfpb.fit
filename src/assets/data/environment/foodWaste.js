//Categories of food are from the WRI research report, and used to match those values in the data visualization
// Values of food waste are taken from "The Estimated Amount, Value, and Calories of Postharvest Food Losses at the Retail and Consumer Levels in the United States"
// From the table "Estimated total calories of food loss at the retail and consumer levels in the United States, 2010" - Consumer level (percent)
// https://www.ers.usda.gov/webdocs/publications/43833/43680_eib121.pdf?v=0
export const ConsumerWaste = {
	Sugar: 30, //Category = Added sugars and sweeteners
	Rice: 19, //Category = Grain products
	"Mustard/Rape-seed oil": 17, //Added fats and oils
	"Soybean oil": 17, //Added fats and oils
	"Sunflowerseed oil": 17, //Added fats and oils
	Maize: 19, //Grain Products
	"Roots and tubers": 19, //Grain Products
	Wheat: 19, //Grain Products
	"Fruits and vegetables": 31.5, //Average of fruit+vegetables (fresh)
	Nuts: 9, //Tree nuts and peanuts
	Pulses: 9, //Tree nuts (hard to choose, but is dehydrated or canned and thus spoils similarly to nuts)
	Pork: 23, // Meat
	Eggs: 26, //Eggs
	"Fish (farmed)": 31, //Fish and seafood
	Poultry: 18, //Poultry
	Dairy: 21, //Dairy products
	"Sheep and goat": 23, // Meat
	Beef: 23 // Meat
};

export const RetailWaste = {
	Sugar: 11, //Category = Added sugars and sweeteners
	Rice: 12, //Category = Grain products
	"Mustard/Rape-seed oil": 21, //Added fats and oils
	"Soybean oil": 21, //Added fats and oils
	"Sunflowerseed oil": 21, //Added fats and oils
	Maize: 12, //Grain Products
	"Roots and tubers": 12, //Grain Products
	Wheat: 12, //Grain Products
	"Fruits and vegetables": 7.5, //Average of fruit+vegetables (fresh)
	Nuts: 6, //Tree nuts and peanuts
	Pulses: 6, //Tree nuts (hard to choose, but is dehydrated or canned and thus spoils similarly to nuts)
	Pork: 4, // Meat
	Eggs: 7, //Eggs
	"Fish (farmed)": 8, //Fish and seafood
	Poultry: 4, //Poultry
	Dairy: 9, //Dairy products
	"Sheep and goat": 4, // Meat
	Beef: 4 // Meat
};
