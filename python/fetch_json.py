import requests
import json


with open('../src/assets/data/nutrition/foodIds.json') as ids_file:    
    ids = json.load(ids_file)

key="PwVSjgNYYAwZ9M4txUxNlFjh44kCgQcrhPPR4X8c"
report_type = "f" #f for full, b for basic
url="https://api.nal.usda.gov/ndb/V2/reports?${foods}&type=${report_type}&api_key=${key}"

response = requests.get('http://thedataishere.com')

data = response.json()
