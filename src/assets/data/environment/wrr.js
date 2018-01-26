export default {
	"land": {
		"Sugar": 0.03,
		"Rice": 0.09,
		"Mustard/Rape-seed oil": 0.10,
		"Soybean oil": 0.16,
		"Sunflowerseed oil": 0.26,
		"Maize": 0.11,
		"Roots and tubers": 0.12,
		"Wheat": 0.14,
		"Fruits and vegetables": 0.24,
		"Nuts": 0.36,
		"Pulses": 0.44,
		"Pork": 0.73,
		"Eggs": 1.24,
		"Fish (farmed)": 1.31,
		"Poultry": 1.80,
		"Dairy": 2.02,
		"Sheep and goat": 11.81,
		"Beef": 12.65
	},
	"water": {
		"Sugar": 605,
		"Rice": 403,
		"Mustard/Rape-seed oil": 393,
		"Soybean oil": 639,
		"Sunflowerseed oil": 607,
		"Maize": 342,
		"Roots and tubers": 423,
		"Wheat": 551,
		"Fruits and vegetables": 1316,
		"Nuts": 3292,
		"Pulses": 963,
		"Pork": 1919,
		"Eggs": 2011,
		"Fish (farmed)": 6219,
		"Poultry": 2712,
		"Dairy": 1696,
		"Sheep and goat": 3731,
		"Beef": 9850
	},
	"ghg": {
		"Sugar": 0.67,
		"Rice": 2.60,
		"Mustard/Rape-seed oil": 1.54,
		"Soybean oil": 2.81,
		"Sunflowerseed oil": 3.46,
		"Maize": 1.97,
		"Roots and tubers": 2.04,
		"Wheat": 2.12,
		"Fruits and vegetables": 4.29,
		"Nuts": 6.29,
		"Pulses": 7.20,
		"Pork": 12.94,
		"Eggs": 20.27,
		"Fish (farmed)": 26.10,
		"Poultry": 29.91,
		"Dairy": 34.44,
		"Sheep and goat": 182.79,
		"Beef": 220.30
	},
	"units": {
		"land": {
			"hectares": 1,
			"acres": 2.47105,
			"sq feet": 107639,
			"US Football Fields": 1.60177,
			"Soccer Fields": 1.39,
			"helipads": 430.556, //asssumes helipad is 50x50
		},
		"ghg": {
			"Tonnes CO2e": 1, //2204.62 lbs in a tonne
			//https://www.eia.gov/tools/faqs/faq.php?id=307&t=11
			"Gallons E10": (2204.62 / 17.2), //convert tonnes to pounds to use EIA data
			"Gallons Gasoline": (2204.62 / 19.6),
			"Gallons Diesel": (2204.62 / 22.4),
			"Gallons Ethanol": (2204.62 / 12.7),
			"Gallons Kerosene": (2204.62 / 21.5),
			//https://www.eia.gov/environment/emissions/co2_vol_mass.php
			"Gallons Natural Gas": (2204.62 / 117.10 * 7480.52), //7480.52 G in 1000 Cu Ft
			// 1 tonne CO2 * 2204.62 lbs/tonne * 1 short ton coal/4631.5 lbs CO2 * 2000lbs/1 short ton
			"Pounds Coal": (2204.62 / 4631.50 * 2000), //1 tonne = 1.10231 US ton,
			"Gallons Jet Fuel": (2204.62 / 21.10),
			"Gallons Aviation Gas": (2204.62 / 18.40),
		},
		"water": {
			"1,000 Cubic Meters": 1,
			"Gallons": 264172,
			"Liters": 1000000,
			"Minutes of Showering": (264172 / 2.2), //gallons / 2.2 GPM
			"Minutes of Low-Flow Showering": (264172 / 0.5), //gallons / 2.2 GPM
			"Olympic Swimming Pools": (264172 / 660430), //660,430 gal in olympic pools
			"Seconds of Max Flow thru Hoover Dam": (264172 / (28424 * 8)), //28,424 gallons per second per gate * 8 gates https://www.usbr.gov/lc/hooverdam/history/essays/jetflow.html
			"Seconds of Flow thru Niagara Horseshoe Falls": (264172 / 681750)
		},
	}
}
