import requests
import json

max_foods_per_request = 25

def fix_sql_ids(id):
    return str(id[0]).zfill(5)#pad start with 0's

#report_type = f for full, b for basic
def get_response(ids, report_type="f", key="PwVSjgNYYAwZ9M4txUxNlFjh44kCgQcrhPPR4X8c"):
    params = {"ndbno":ids, "type": report_type, "api_key":key}
    url="https://api.nal.usda.gov/ndb/V2/reports"
    return requests.get(url, params=params)

def open_ids():
    #get IDs by downloading https://github.com/alyssaq/usda-sqlite and running the SQL query
    with open('./food_ids/ids.json') as ids_file:    
        ids = json.load(ids_file)
    
    return list(map(fix_sql_ids,ids))

def fetch_USDA_api_data():
    responses = []
    ids = open_ids()
    while len(ids) > 0:
        id_subsection = ids[0:max_foods_per_request-1] 

        responses += get_response(id_subsection).json() 

        ids = ids[max_foods_per_request-1:]
    return responses

print(fetch_USDA_api_data())
