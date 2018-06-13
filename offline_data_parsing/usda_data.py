import grequests
import json
import pprint
import pdb

max_foods_per_request = 3

important_nutrients = {
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
		319, # Retinol,
		# 320, # Vitamin A, RAE,
		# 321, # Carotene, beta,
		# 322, # Carotene, alpha,
		# 334, # Cryptoxanthin, beta,        
		323, # Vitamin E (alpha-tocopherol),
		# 324, # Vitamin D,
		325, # Vitamin D2 (ergocalciferol),
		326, # Vitamin D3 (cholecalciferol),
		# 328, # Vitamin D (D2 + D3),
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
		431, # Folic acid,
		432, # Folate, food,
		# 435, # Folate, DFE
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

nutrient_summations = {
	# 323 Vitamin E (alpha-tocopherol),
	"323": [
		341, # Tocopherol, beta,
		342, # Tocopherol, gamma,
		343, # Tocopherol, delta,
		344, # Tocotrienol, alpha,
		345, # Tocotrienol, beta,
		346, # Tocotrienol, gamma,
		347, # Tocotrienol, delta,
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
        
        break
    
    responses = grequests.map(usda_requests)

    return list( map(lambda x: x.json(), responses) )

def get_foods_from_responses(list_usda_responses): #https://ndb.nal.usda.gov/ndb/doc/apilist/API-FOOD-REPORTV2.md
    foods = []

    for response in list_usda_responses:
        response_foods = response['foods']
        for food in response_foods:
            foods.append(parse_food(food))
    return foods

def parse_nutrient(usda_nutrient):
    id = usda_nutrient['nutrient_id']
    val_in_100g = get_nutrient_value(usda_nutrient)
    val_in_100g = "{:.3g}".format(val_in_100g)

    with open('../src/assets/data/ImportantNutrients') as f:
        important_nutrients = commentjson.load(f)
        pdb.set_trace()

    return {id: val_in_100g}

def parse_food(usda_food):
    usda_food = usda_food['food']
    food = {}

    food["id"] = int(usda_food["desc"]["ndbno"])
    food["name"] = usda_food["desc"]["name"]

    #add food group
    with open('../src/assets/data/foodGroupIds.json') as f:
        food_group_ids = json.load(f)
    food_group_names = dict((v,k) for k,v in food_group_ids.items()) #swap keys and values
    food['fg'] = food_group_names[usda_food["desc"]["fg"]]
    
    food['nutrients'] = {}
    for usda_nutrient in food['nutrients']:
        nutrient = parse_nutrient(usda_nutrient)
        food['nutrients'].update(nutrient)

    pdb.set_trace()
    return food

def get_nutrient_value(n):
    val = float(n["value"])
    unit = n['unit']
    if (unit == 'µg'):
        val *= 1e-6
    elif (unit == 'mg'):
        val *= 1e-3
    return val


responses = fetch_USDA_data()
foods = get_foods_from_responses(responses)
pp = pprint.PrettyPrinter(indent=4,depth=3)
pp.pprint(foods)
