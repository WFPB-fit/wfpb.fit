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
	-- food_group.name,
	food.id
	FROM food
	-- inner join food_group on food_group.id=food.food_group_id
	-- inner join nutrition on food.id=nutrition.food_id
	-- inner join weight on food.id=weight.food_id
	where
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
		long_desc not like '%separable lean and fat%' and --most people cut off the pure fat from their steaks/meat, so we won't include it
		long_desc not like '%imported%' and -- remove imported food
		long_desc not like '%industrial%' and -- this is a consumer facing app
		long_desc not like '%USDA Commodity%'
	) and
	--------- PRESERVATIVES & ADDITIVES ---------
	-- Currently, processed foods are given the benefit of the doubt. Only the best available ones are selected (without salt, with skin, etc), even though this is not what most consumers eat
	(
		long_desc not like '%with salt%' and
		long_desc not like '%low moisture%' and
		long_desc not like '%dehydrated%' and
		long_desc not like '%prepared with whole milk%' and
		long_desc not like '% fortified%' and
		long_desc not like '% lauric acid%' and
		long_desc not like '% added%' and
		-- long_desc not like '%salt added in processing%' and
		-- long_desc not like '%with added ascorbic acid%' and
		-- long_desc not like '%with added sugar%' and
		long_desc not like '%sulfured%' and
		long_desc not like '%without skin%' and
		long_desc not like '%drained%' and
		long_desc not like '%with butter sauce%' and
		long_desc not like '%added solution%'
	) and
	--------- RAW MEAT ---------
	(
		(
			long_desc not like '% raw%' and -- is raw
			long_desc not like '% uncooked%' and -- is raw
			( --is meat (not is plant)
				food_group_id != 200 and --spices,herbs
				food_group_id != 900 and --fruit
				food_group_id != 1100 and --veges
				food_group_id != 1200 and --nuts,seeds
				food_group_id != 1600 and --legumes
				food_group_id != 2000    --grains
			)
		) or ( --is plant
				food_group_id == 200 or --spices,herbs
				food_group_id == 900 or --fruit
				food_group_id == 1100 or --veges
				food_group_id == 1200 or --nuts,seeds
				food_group_id == 1600 or --legumes
				food_group_id == 2000    --grains
		)
	) and
	--------- COOKING METHODOLOGY ---------
	(
		long_desc not like '% unprepared%' and
		long_desc not like '%braised%' and
		long_desc not like '%pan-broiled%'
	) and
	--------- MEAT TYPE ---------
	(
		long_desc not like '% select%' and
		long_desc not like '% all grades%' and
		long_desc not like '%light meat%' and
		long_desc not like '%dark meat%' and
		long_desc not like '%meat and skin%'
	) and
	--------- INCLUSION ---------
	(
		--------- SIMPLE ---------
		LENGTH(long_desc) < 11 or --short named foods are hard to filter for in other metrics and can be popular

		--------- PLANTS ---------
		(
			(
				food_group_id == 200 or --spices,herbs
				food_group_id == 900 or --fruit
				food_group_id == 1100 or --veges
				food_group_id == 1200 or --nuts,seeds
				food_group_id == 1600 or --legumes
				food_group_id == 2000    --grains
			) and
			long_desc like '% raw%' or
			long_desc like '%frozen%'
		) or

		--------- MEATLESS ---------
		(
			long_desc like '%Vegetarian%' or --not sure on capitalization
			long_desc like '%Vegan%' or
			long_desc like '%Meatless%'
		) or
		--------- COOKING METHODOLOGY ---------
		(
			(--generally cooked
				LENGTH(long_desc) <= 35 and
				long_desc like '%cooked%' and
				long_desc not like '%uncooked%'
			) or
			(long_desc like '%home%' and long_desc like '%prepared%') or -- home prepped
			(-- unique cooking types
				long_desc like '%grilled%' or
				long_desc like '%roasted%' or
				long_desc like '%broiled%' or
				long_desc like '% BBQ%'
			)
		) or

		--------- FOOD GROUPS ---------
		(	--fruit + juice:
			food_group_id == 900 and
			( --canned type
				long_desc like '%canned%' and
				long_desc not like '%drained%' and
				long_desc not like '%extra heavy syrup%' and
				long_desc not like '%extra light syrup%' and
				long_desc not like '%water pack%' and
				long_desc not like '%juice pack%'
			)
		) or
		-- (	--vegetable products:
		-- 	food_group_id == 1100 and
		-- ) or
		(	--beef products:
			food_group_id == 1300 and
			long_desc like '% choice%' or -- meat type
			long_desc like '%patty%' or
			long_desc like '%patties%'
		) or
		( --legumes
			food_group_id==1600 and
			long_desc like '%flour%' or
			long_desc like '%butter%' or
			long_desc like '%yogurt%' or
			long_desc like '%milk%' or
			long_desc like '%tofu%' or
			long_desc like '%soy%' or
			long_desc like '%meat%' or
			long_desc like '%burger%' or
			long_desc like '%protein%' or
			long_desc like '%chili%'
		) or
		--------- INDIVIDUAL IDS ---------
		(
			food.id == 16006 or --baked beans, canned, plain
			food.id == 16403 --refried beans
		)

	)
