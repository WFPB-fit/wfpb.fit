import grequests
import json
import pdb
import re

#EXAMPLE: https://api.nal.usda.gov/ndb/V2/reports?ndbno=11233&type=f&api_key=PwVSjgNYYAwZ9M4txUxNlFjh44kCgQcrhPPR4X8c

max_foods_per_request = 25 #25 = usda max

# Calcium (mg/d) CHO (g/d) Protein (g/kg/d) Vit A (μg/d)aVit C (mg/d) Vit D (μg/d) Vit E (mg/d)bThiamin (mg/d) Ribo-flavin (mg/d) Niacin (mg/d)cVit B6(mg/d) Folate (μg/d)dVit B12(μg/d) Copper (μg/d) Iodine (μg/d) Iron (mg/d) Magnes-ium (mg/d) Molyb-denum (μg/d) Phos-phorus (mg/d) Sele-nium (μg/d) Zinc
# 19–30 y 800 100 0.66 625 75 10 12 1.0 1.1 12 1.1 320 2.0 700 95 6 330 34 580 45 9.

#source: http://nationalacademies.org/HMD/Activities/Nutrition/SummaryDRIs/DRI-Tables.aspx
#male 19-30, 150lbs (~68kgs)

# An Estimated Average Requirement (EAR) is the average daily nutrient intake level estimated to meet the requirements of half of the healthy individuals in a group.
#An DRI is the average daily dietary intake level; sufficient to meet the nutrient requirements of nearly all (97-98 percent) healthy individuals in a group
# ...
# If sufficient scientific evidence is not available to establish an EAR, and thus calculate an DRI, an AI is usually developed. For healthy breastfed infants, an AI is the mean intake. The AI for other life stage and gender groups is believed to cover the needs of all healthy individuals in the groups, but lack of data or uncertainty in the data prevent being able to specify with confidence the percentage of individuals covered by this intake.  

dri_vitamin_names = 'A C D  E  K Thiamin Riboflavin Niacin  B6          Folate                    B12       Pantothenic-Acid       Biotin       Choline '
dri_vitamin_units = ' (μg/d)            (mg/d)            (μg/d)          (mg/d)           (μg/d)           (mg/d)           (mg/d)           (mg/d)       (mg/d)       (μg/d)       (μg/d)       (mg/d)       (μg/d)       (mg/d)'
dri_vitamin_vals = '900                 90                 15                 15                 120* 1.2               1.3               16               1.3               400               2.4               5*                      30*                      550* '

dri_element_names = 'Calcium Chromium Copper Fluoride Iodine Iron Magnesium     Manganese     Molybdenum     Phosphorus     Selenium     Zinc     Potassium Sodium     Chloride '
dri_element_units = '(mg/d)               (μg/d)               (μg/d)               (mg/d)               (μg/d)           (mg/d)           (mg/d)           (mg/d)           (μg/d)           (mg/d)             (μg/d)             (mg/d)             (g/d)             (g/d)             (g/d)  '
dri_element_vals = '1,000 35* 900 4* 150                 8                 400                 2.3* 45                         700                         55                         11                         4.7*          1.5*          2.3*'

#protein =  Based on g protein per kg of body weight for the reference body weight, e.g., for adults 0.8 g/kg body weight for the reference body weight = 56/0.8=70kg
dri_macro_names = 'Water Carbohydrate Fiber Fat Linoleic-Acid α-Linolenic-Acid Protein'
dri_macro_units = '(L/d)             (g/d)             (g/d)             (g/d)             (g/d)             (g/d)             (g/d)'
dri_macro_vals = '3.7* 130 38*              ND              17*              1.6*              56 '

def parse_dri_info(prev_DRI, names,units,values):
	names = re.sub(' +', ' ', names).split()
	units = re.sub(' +', ' ', units).split()
	values = re.sub(' +', ' ', values).split()

	DRI = {}

	if len(names) != len(units) or len(units) != len(values):
		print(len(names))
		print(len(units))
		print(len(values))
		print(values)
		raise Exception('parsing error')

	for i in range(len(names)):
		# is_AI = "*" not in values[i]
		# if not is_AI: #only include DRI values
		# 	continue

		val = values[i].replace("*", "").replace(",", "")
		if val == "ND":
			val = None
		else:
			val = float(val)
		
		#scale by the units
		u = units[i]
		if "mg" in u:
			val /= 1000.0
		elif "μg" in u:
			val /= 1000000.0

		DRI[names[i]] = val

	DRI.update(prev_DRI)
	return DRI

def nutrient_names_to_ids(DRI):
	DRI2 = {}
	
	## Vitamins
	# DRI Missing: None
	# AI Missing: Biotin 
	DRI2[320] = DRI['A']
	DRI2[401] = DRI['C']
	DRI2[328] = DRI['D']
	DRI2[323] = DRI['E']
	DRI2[430] = DRI['K'] #not DRI
	DRI2[404] = DRI['Thiamin']
	DRI2[405] = DRI['Riboflavin']
	DRI2[406] = DRI['Niacin']
	DRI2[415] = DRI['B6']
	DRI2[435] = DRI['Folate']
	DRI2[418] = DRI['B12']
	DRI2[410] = DRI['Pantothenic-Acid'] #not DRI
	DRI2[320] = DRI['Choline'] #not DRI

	## Minerals/Elements
	# DRI Missing: Chromium, Iodine, Molybdenum not included 
	# AI Missing: Biotin
	DRI2[301] = DRI['Calcium']
	DRI2[303] = DRI['Iron']
	DRI2[304] = DRI['Magnesium']
	DRI2[305] = DRI['Phosphorus']
	DRI2[306] = DRI['Potassium']#not DRI
	DRI2[307] = DRI['Sodium']#not DRI
	DRI2[309] = DRI['Zinc']
	DRI2[313] = DRI['Fluoride']#not DRI
	DRI2[315] = DRI['Manganese']#not DRI
	DRI2[317] = DRI['Selenium']

	#Macros
	# Missing: water
	DRI2[205] = DRI['Carbohydrate']
	DRI2[203] = DRI['Protein']
	DRI2[291] = DRI['Fiber']#not DRI

	#Fats
	# Missing: Linoleic Acid
	# DRI2[203] = DRI['Fat'] #not DRI
	DRI2[851] = DRI['α-Linolenic-Acid']#not DRI

	return DRI2

nutrients_in_graphs = {
	"calories": [208],
	"misc": [	
		601, #Cholesterol,  
		636, #phytosterol  
	],
	"macros": [
		203, #protein
		204, #total fat
		205, #carbohydrates by difference
	],
	"carbs":[
		291, #fiber, total dietary  	
		209, #Starch
		269, #Sugars
	],
	"fats": [
		606, #Fatty acids, total saturated,
		605, #Fatty acids, total trans,

		645, #Fatty acids, total monounsaturated,
		646, #Fatty acids, total polyunsaturated,
	],
	"omega3":[
		# omega 3's
		851, # 18:3 n-3 c,c,c (ALA)
		621, # 22:6 n-3 (DHA),
		629, # 20:5 n-3 (EPA),
		631, # 22:5 n-3 (DPA),
	],
	"amino": [
		454, # Betaine,
		501, # Tryptophan,
		502, # Threonine,
		503, # Isoleucine,
		504, # Leucine,
		505, # Lysine,
		506, # Methionine,
		507, # Cystine,
		508, # Phenylalanine,
		509, # Tyrosine,
		510, # Valine,
		511, # Arginine,
		512, # Histidine,
		513, # Alanine,
		514, # Aspartic acid,
		515, # Glutamic acid,
		516, # Glycine,
		517, # Proline,
		518, # Serine,
		521, # Hydroxyproline,
	],
	"minerals": [
		301, # Calcium, Ca,
		303, # Iron, Fe,
		304, # Magnesium, Mg,
		305, # Phosphorus, P,
		306, # Potassium, K,
		307, # Sodium, Na,
		309, # Zinc, Zn,
		312, # Copper, Cu,
		313, # Fluoride, F,
		315, # Manganese, Mn,
		317, # Selenium, Se,
	],
	"vitamins": [
		# 318, # Vitamin A, IU,
		# 573, # Vitamin E, added,
		# 578, # Vitamin B-12, added,
		# 319, # Retinol,
		320, # Vitamin A, RAE, #### https://ods.od.nih.gov/factsheets/VitaminA-HealthProfessional/
		# 321, # Carotene, beta,
		# 322, # Carotene, alpha,
		# 334, # Cryptoxanthin, beta,		
		323, # Vitamin E (alpha-tocopherol),
		# 324, # Vitamin D,
		# 325, # Vitamin D2 (ergocalciferol),
		# 326, # Vitamin D3 (cholecalciferol),
		328, # Vitamin D (D2 + D3),
		# 337, # Lycopene,
		# 338, # Lutein + zeaxanthin,
		# 341, # Tocopherol, beta,
		# 342, # Tocopherol, gamma,
		# 343, # Tocopherol, delta,
		# 344, # Tocotrienol, alpha,
		# 345, # Tocotrienol, beta,
		# 346, # Tocotrienol, gamma,
		# 347, # Tocotrienol, delta,
		401, # Vitamin C, total ascorbic acid,
		404, # Thiamin,
		405, # Riboflavin,
		406, # Niacin,
		410, # Pantothenic acid,
		415, # Vitamin B-6,
		# 417, # Folate, total,
		418, # Vitamin B-12,
		421, # Choline, total,
		# 428, # Menaquinone-4,
		# 429, # Dihydrophylloquinone,
		430, # Vitamin K (phylloquinone),
		# 431, # Folic acid,
		# 432, # Folate, food,
		435, # Folate, DFE
	],
	"carotenoids": [
		321, 322, #carotene
		334, #Cryptoxanthin
		337, #Lycopene
		338, #Lutein + zeaxanthin
	],
	"flavonoids": [
		713, #total isoflavones
		731, #anthocyanidins
		734, #Proanthocyanidin
		749, #Catechins
		785, #flavonols
		758, #flavanones
	],
}

important_nutrients = []
for nutrients in nutrients_in_graphs.values():
	important_nutrients.extend(nutrients)

nutrient_summations = {
	# 323 Vitamin E (alpha-tocopherol),
	"323": [
		573, # Vitamin E, added,

		# 341, # Tocopherol, beta,
		# 342, # Tocopherol, gamma,
		# 343, # Tocopherol, delta,
		# 344, # Tocotrienol, alpha,
		# 345, # Tocotrienol, beta,
		# 346, # Tocotrienol, gamma,
		# 347, # Tocotrienol, delta,
	],

	"418":[ # Vitamin B-12,
		578, # Vitamin B-12, added,
	],

	# 710: [ #isoflavones
	# 	# 710, # Object { name: "Daidzein", group: "Isoflavones" }
	# 	711, # Object { name: "Genistein", group: "Isoflavones" }
	# 	712, # Object { name: "Glycitein", group: "Isoflavones" }
	# 	713, # Object { name: "Total isoflavones", group: "Isoflavones" }
	# 	714, # Object { name: "Biochanin A", group: "Isoflavones" }
	# 	715, # Object { name: "Formononetin", group: "Isoflavones" }
	# 	716, # Object { name: "Coumestrol", group: "Isoflavones" }		
	# ],
	"731": [ #anthocyanidins
		# 731, # Object { name: "Cyanidin", group: "Anthocyanidins" }
		740, # Object { name: "Petunidin", group: "Anthocyanidins" }
		741, # Object { name: "Delphinidin", group: "Anthocyanidins" }
		742, # Object { name: "Malvidin", group: "Anthocyanidins" }
		743, # Object { name: "Pelargonidin", group: "Anthocyanidins" }
		745, # Object { name: "Peonidin", group: "Anthocyanidins" }
	],
	"734": [ # Total Proanthocyanidin
		# 734: "Proanthocyanidin dimers"
		735, # 735: "Proanthocyanidin trimers"
		736, # 736: "Proanthocyanidin 4-6mers"
		737, # 737: "Proanthocyanidin 7-10mers"
		738 # 738: "Proanthocyanidin polymers (>10mers)"
	],
	"749": [ #Catechins
		# 749, # Object { name: "(+)-Catechin", group: "Flavan-3-ols" }
		750, # Object { name: "(-)-Epigallocatechin", group: "Flavan-3-ols" }
		751, # Object { name: "(-)-Epicatechin", group: "Flavan-3-ols" }
		752, # Object { name: "(-)-Epicatechin 3-gallate", group: "Flavan-3-ols" }
		753, # Object { name: "(-)-Epigallocatechin 3-gallate", group: "Flavan-3-ols" }
		794, # Object { name: "(+)-Gallocatechin", group: "Flavan-3-ols" }
	],
	"785": [ #flavonols
		# 785, # Object { name: "Isorhamnetin", group: "Flavonols" }
		786, # Object { name: "Kaempferol", group: "Flavonols" }
		788, # Object { name: "Myricetin", group: "Flavonols" }
		789, # Object { name: "Quercetin", group: "Flavonols" }
	],
	"758": [ #flavanones
		# 758, # Object { name: "Eriodictyol", group: "Flavanones" }
		759, # Object { name: "Hesperetin", group: "Flavanones" }
		762, # Object { name: "Naringenin", group: "Flavanones" }
		770, # Object { name: "Apigenin", group: "Flavones" }
		773, # Object { name: "Luteolin", group: "Flavones" }
	],
	"636": [ #Phytosterols
		# 636, # Phytosterols,
		638, # Stigmasterol,
		639, # Campesterol,
		641, # Beta-sitosterol,
	]
}


def fix_sql_ids(id):
	return str(id[0]).zfill(5)#pad start with 0's

#report_type = f for full, b for basic
def get_response(ids, report_type="f", key="PwVSjgNYYAwZ9M4txUxNlFjh44kCgQcrhPPR4X8c"):
	params = {"ndbno":ids, "type": report_type, "api_key":key}
	url="https://api.nal.usda.gov/ndb/V2/reports"
	return grequests.get(url, params=params)

def open_ids():
	# return [11233]

	#get IDs by downloading https://github.com/alyssaq/usda-sqlite and running the SQL query
	with open('./food_ids/ids.json') as ids_file:	
		ids = json.load(ids_file)
	
	return list(map(fix_sql_ids,ids))

def fetch_USDA_data():
	usda_requests = []
	ids = open_ids()
	
	while len(ids) > 0:
		id_subsection = ids[0:max_foods_per_request] 

		usda_requests.append( get_response(id_subsection) )

		ids = ids[max_foods_per_request:]
	
	responses = grequests.map(usda_requests)
	
	return list( map(lambda x: x.json(), responses) )

def get_foods_from_responses(list_usda_responses): #https://ndb.nal.usda.gov/ndb/doc/apilist/API-FOOD-REPORTV2.md
	foods = []
	
	for response in list_usda_responses:
		response_foods = response['foods']
		for food in response_foods:
			food = parse_food(food)
			if food != None:
				foods.append(food)
	return foods

def get_num_calories(usda_food):
	num_calories = [n['value'] for n in usda_food['nutrients'] if n.get('nutrient_id')==208] #find the calorie nutrient object
	return num_calories[0]

def parse_food(usda_food):
	if 'food' not in usda_food:
		return None
	usda_food = usda_food['food']
	food = {}

	food["id"] = int(usda_food["desc"]["ndbno"])
	food["name"] = usda_food["desc"]["name"]

	#add food group
	with open('../src/assets/data/foodGroupIds.json') as f:
		food_group_ids = json.load(f)
	food_group_names = dict((v,k) for k,v in food_group_ids.items()) #swap keys and values
	food['fg'] = int(food_group_names[usda_food["desc"]["fg"]])
	
	#parse the nutrients into their values
	food['nutrients'] = {}
	num_calories = get_num_calories(usda_food)
	for usda_nutrient in usda_food['nutrients']:
		amt = get_nutrient_value(usda_nutrient)
		if num_calories != 0:
			amt *= 100 / num_calories #normalize nutrient to 100kcal
		else:
			return None #do not include 0 calorie foods?
		
		n_id = usda_nutrient['nutrient_id']
		food['nutrients'][n_id] = amt
	food['nutrients'][208] = num_calories #fix the calories which got 'normalized' in the loop
	
	#sum up certain nutrients to reduce size of the data
	for n_total_id in nutrient_summations:
		ids = nutrient_summations[n_total_id]
		n_sum = food['nutrients'].get(int(n_total_id),0)
		for n_id_to_add in ids:
			if n_id_to_add in food['nutrients']:
				n_sum += food['nutrients'].get(int(n_id_to_add),0)
				# del food['nutrients'][n_id_to_add]

		if (n_sum > 0):
			food['nutrients'][int(n_total_id)] = n_sum
		# pdb.set_trace()

	
	#keep only important, formatted nutrients
	nutrients = {}
	for n_id in food['nutrients']:
		if n_id in important_nutrients:
			val = food['nutrients'][n_id]
			val = "{:.3g}".format(val) #format to reduce unnecessary data
			val = float(val)
			nutrients[n_id] = val
	food['n'] = nutrients
	del food['nutrients']

	return food

def get_nutrient_value(n):
	val = float(n["value"])
	unit = n['unit']
	if (unit == 'µg'):
		val *= 1e-6
	elif (unit == 'mg'):
		val *= 1e-3
	return val

def index_foods(foods):
	new_foods = {}
	for food in foods:
		id = food['id']
		del food['id']
		new_foods[id] = food
	return new_foods

def format_and_save_food_data(folder_name, update_usda_foods):
	DRI = {}
	DRI = parse_dri_info(DRI, dri_vitamin_names, dri_vitamin_units, dri_vitamin_vals)
	DRI = parse_dri_info(DRI, dri_element_names, dri_element_units, dri_element_vals)
	DRI = parse_dri_info(DRI, dri_macro_names,   dri_macro_units,   dri_macro_vals)
	DRI = nutrient_names_to_ids(DRI)

	if update_usda_foods:
		responses = fetch_USDA_data()
		foods = get_foods_from_responses(responses)
		foods = index_foods(foods)

		with open(folder_name+"foods.json", 'w') as outfile:
			json.dump(foods, outfile)
			# json.dump(foods, outfile, indent=4, separators=(',', ': '))
		
	with open(folder_name+"graphNutrients.json", 'w') as outfile:
		json.dump(nutrients_in_graphs, outfile)

	with open(folder_name+"DRI.json", 'w') as outfile:
		json.dump(DRI, outfile)
