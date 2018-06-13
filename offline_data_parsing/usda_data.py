import grequests
import json
import pprint

max_foods_per_request = 3

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
            foods.append(food['food'])
    return foods

def parse_foods(foods):
    new_foods = []
    for food in foods:
        new_foods.append(food)
    return new_foods

# def get_nutrient_value(n):
#     val = n["value"]
#     if (n.unit === 'µg') val *= 1e-6;
#     else if (n.unit === 'mg') val *= 1e-3;
#     return val;


responses = fetch_USDA_data()
foods = get_foods_from_responses(responses)
# foods = list(map(parse_foods, foods))
pp = pprint.PrettyPrinter(indent=4,depth=3)
pp.pprint(foods)
