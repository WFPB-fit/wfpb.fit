--get USDA SR28 SQLite info from https://github.com/alyssaq/usda-sqlite
--upload, view, and query using https://sqliteonline.com/
-- In general we want to present few, good choices to make selection easier on the web app. Users can look up full data at USDA/Google if they desire
SELECT food.id,food.long_desc,food_group.name FROM food
	inner join food_group on food_group.id=food.food_group_id
	where
	--------- TOTAL FOOD GROUP REMOVAL ---------
	(
		food.food_group_id !=300 and -- baby food
		food.food_group_id !=600 and -- soups/sauces
		food.food_group_id !=3500 and -- native food
		food.food_group_id !=3600 and --restaruants
		food.food_group_id != 1800 --baked products
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
		long_desc not like '%with added ascorbic acid%' and
		long_desc not like '%with added sugar%' and
		long_desc not like '%sulfured%' and
		long_desc not like '%without skin%' and
		long_desc not like '%drained%' and
		long_desc not like '%added solution%'
	) and
	(
		--------- SIMPLE ---------
		LENGTH(long_desc) < 11 or --short named foods are hard to filter for in other metrics and can be popular

		--------- MEATLESS ---------
		(
			long_desc like '%egetarian%' or --not sure if removing first letter (due to capitalization worries) is really neccessary
			long_desc like '%egan%' or
			long_desc like '%eatless%'
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
				long_desc like '%BBQ%'
			)
		) or

		--------- FOOD GROUPS ---------
		(	--fruit + juice:
			food_group_id == 900 and
			(-- meat type
				long_desc like '%raw%' or
				( --canned type
					long_desc like '%canned%' and
					long_desc not like '%drained%' and
					long_desc not like '%extra heavy syrup%' and
					long_desc not like '%extra light syrup%' and
					long_desc not like '%water pack%' and
					long_desc not like '%juice pack%'
				)
			)
		) or
		(	--beef products:
			food_group_id == 1300 and
			(-- meat type
				long_desc like '%choice%' or
				long_desc like '%patty%' or
				long_desc like '%patties%'
			)
		) or
		( --legumes
			food_group_id==1600 and
			long_desc like '%raw%' or
			long_desc like '%flour%' or
			long_desc like '%butter%' or
			long_desc like '%yogurt%' or
			long_desc like '%milk%' or
			long_desc like '%tofu%' or
			long_desc like '%soy%' or
			long_desc like '%meat%' or
			long_desc like '%burger%' or
			long_desc like '%protein%' or
			long_desc like '%chili%' or
			food.id == 16006 or --baked beans, canned, plain
			food.id == 16403 --refried beans
		)

	)
