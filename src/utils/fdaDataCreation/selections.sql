--get USDA SR28 SQLite info from https://github.com/alyssaq/usda-sqlite
--upload, view, and query using https://sqliteonline.com/
-- select all foods
SELECT food.id,food.long_desc,food_group.name FROM food
	inner join food_group on food_group.id=food.food_group_id
	where
	food.food_group_id !=300 and -- baby food
	food.food_group_id !=3500 and -- native food
	food.food_group_id !=3600 and --restaruants
	food.food_group_id != 1800 and --baked products
	manufac_name is '' and --remove company specific food
	(	--beef products:
		food_group_id == 1300 and
		(-- meat type
			long_desc like '%choice%' or
			long_desc like '%patty%' or
			long_desc like '%patties%'
		)	and
		(-- cooking types
			long_desc like '%grilled%' or
			long_desc like '%roasted%' or
			long_desc like '%broiled%'
		) and
		long_desc not like '%by-products%' and
		long_desc not like '%imported%'
		or
		food_group_id != 1300
	)
	( --legumes
		food_group_id==1600 and
		long_desc like '%raw%' or
		-- long_desc like '%cooked, boiled, without salt%' or
		long_desc like '%flour%' or
		long_desc like '%butter%' or
		long_desc like '%tofu%' or
		long_desc like '%meatless%' or
		long_desc like '%yogurt%' or
		long_desc like '%milk%' or
		long_desc like '%egetarian%' or
		long_desc like '%soybean%' or
		long_desc == 'Papad'
		or
		food_group_id != 1600
	)
