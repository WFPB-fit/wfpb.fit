--get USDA SR28 SQLite info from https://github.com/alyssaq/usda-sqlite
--upload, view, and query using https://sqliteonline.com/
-- In general we want to present few, good choices to make selection easier on the web app. Users can look up full data at USDA/Google if they desire

-- Select All serving sizes
-- SELECT food_id,gm_weight FROM  weight where weight.description=='serving';

-- Select All nutrient names
-- SELECT id,name FROM  nutrient;

-- Select All nutrient units
-- SELECT id,units FROM  nutrient;

-- Find all interesting food and extract certain columns
SELECT
	-- food.long_desc,
	-- gm_weight
	-- nutrition.amount,
	-- nutrition.nutrient_id
	-- food_group.name, --need to uncomment the inner join with the food_group table
	-- food.long_desc,
	food.id
	FROM food
	-- inner join food_group on food_group.id=food.food_group_id
	inner join nutrition on food.id=nutrition.food_id
	-- inner join weight on food.id=weight.food_id
	where
	-- no zero calorie stuff. 
	-- This discludes Tea so may change it later, but 0 cal makes it impossible to normalize nutrients to 100kcal in the app unless i go by weight, 
	-- which would make everything very confusing
	(nutrition.nutrient_id == 208 and nutrition.amount != 0) and  
	-- weight.description like 'serving%' and 
	--------- EXCLUSION ---------
	--------- TOTAL FOOD GROUP REMOVAL ---------
	(
		food_group_id !=300 and -- baby food
		food_group_id !=600 and -- soups/sauces
		food_group_id != 1800 and --baked products
		food_group_id != 2100 and --fast foods
		food_group_id !=3500 and -- native food
		food_group_id !=3600 --restaruants
	) and
	--------- GENERAL FILTERING ---------
	(
		manufac_name is '' and --remove company specific food
		long_desc not like '%by-product%' and --remove waste food
		long_desc not like '%industrial%' and -- this is a consumer facing app
		long_desc not like '%USDA Commodity%'
	) and
	--------- LOCATIONS ---------
	(
		long_desc not like '% style%' and --italian, spanish, etc
		long_desc not like '%California%' and
		long_desc not like '%Florida%' and
		long_desc not like '%imported%'
	) and
	--------- PRESERVATIVES & ADDITIVES ---------
	-- Currently, processed foods are given the benefit of the doubt. Only the best available ones are selected (without salt, with skin, etc), even though this is not what most consumers eat
	(
		long_desc not like '%, unspecified %' and
		long_desc not like '%, with %' and
		long_desc not like '%, made from %' and
		long_desc not like '%, made with %' and
		long_desc not like '%, canned with %' and
		long_desc not like '% sweetened%' and
		long_desc not like '% unsweetened%' and
		long_desc not like '% enriched%' and
		long_desc not like '%, powder%' and
		long_desc not like '%, dried%' and
		long_desc not like '%, acid,%' and
		long_desc not like '%with salt%' and
		long_desc not like '%, salted%' and
		long_desc not like '%, low%' and --fat,sodium,carbs, etc
		long_desc not like '%reduced sodium%' and
		long_desc not like '%fat-free%' and
		long_desc not like '%fat only%' and
		long_desc not like '%defatted%' and
		long_desc not like '%low-fat%' and
		long_desc not like '%reduced fat%' and
		long_desc not like '%home recipe%' and
		long_desc not like '%low moisture%' and
		long_desc not like '%dehydrated%' and
		long_desc not like '%, dry%' and
		long_desc not like '%prepared with whole milk%' and
		long_desc not like '%prepared from%' and
		long_desc not like '% fortified%' and
		long_desc not like '% lauric acid%' and
		long_desc not like '% added%' and
		-- long_desc not like '%salt added in processing%' and
		-- long_desc not like '%with added ascorbic acid%' and
		-- long_desc not like '%with added sugar%' and
		long_desc not like '%sulfured%' and
		long_desc not like '%without skin%' and
		long_desc not like '%skin only%' and
		-- long_desc not like '%without skin%' and
		long_desc not like '%drained%' and
		long_desc not like '%with butter sauce%' and
		long_desc not like '%added solution%'
	) and
	--------- RAW MEAT ---------
	--works! Includes entries from 'meals and entrees', ie chicken tenders
	(
		(
			long_desc not like '% raw%' and
			long_desc not like '% frozen%' and 
			long_desc not like '% uncooked%' and 
			( --is meat (not is plant)
				food_group_id == 100 and --dairy and eggs
				food_group_id == 500 and --poultry
				food_group_id == 1000 and --pork
				food_group_id == 1300 and --beef
				-- food_group_id == 1500 and --fish
				food_group_id == 1700 --lamb,veal,game
			)
		) or ( --is not meat
				food_group_id != 100 and --dairy and eggs
				food_group_id != 500 and --poultry
				food_group_id != 1000 and --pork
				food_group_id != 1300 and --beef
				-- food_group_id != 1500 and --fish
				food_group_id != 1700 --lamb,veal,game
		)
	) and
	--------- COOKING METHODOLOGY ---------
	(
		long_desc not like '%, pan-browned%' and
		long_desc not like '%, microwaved%' and
		long_desc not like '%, homemade%' and
		long_desc not like '% stewed%' and
		long_desc not like '% unheated%' and
		long_desc not like '% unprepared%' and
		-- long_desc not like '% fried%' and
		long_desc not like '% simmered%' and
		long_desc not like '% rotisserie%' and
		long_desc not like '%braised%' and
		-- long_desc not like '%grilled%' and
		long_desc not like '%broiled%' and
		long_desc not like '% BBQ%' and
		long_desc not like '%pan-broiled%'
	) and
	--------- MEAT TYPE ---------
	(
		long_desc not like '%, immitation%' and
		long_desc not like '%, bone-in%' and
		long_desc not like '% extra lean%' and
		long_desc not like '%separable lean and fat%' and --most people cut off the pure fat from their steaks/meat, so we won't include it

		-- long_desc not like '% leg%' and
		-- long_desc not like '% thigh%' and
		long_desc not like '% feet%' and
		long_desc not like '% skin-only%' and
		long_desc not like '%, back%' and
		
		long_desc not like '% select%' and
		long_desc not like '% all grades%' and
		long_desc not like '%light meat%' and
		long_desc not like '%dark meat%' and
		long_desc not like '%meat and skin%'
	) and 
	--------- CANNED TYPE ---------
	( 
		long_desc not like '%drained%' and
		long_desc not like '%, heavy syrup%' and
		long_desc not like '%extra heavy syrup%' and
		long_desc not like '%extra light syrup%' and
		long_desc not like '%water pack%' and
		-- long_desc not like '%, solid and liquids%' and
		long_desc not like '%juice pack%'
	) and 
	--------- JUICE TYPE ---------
	( 
		long_desc not like '%frozen concentrate%' and
		long_desc not like '%canned or bottled%'
	)

