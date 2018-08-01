import json


def preprocess_studies(folder_name):
    with open('./research.json') as research:	
        studies = json.load(research)

    #add ID and export 'quotes' to another dictionary
    study_quotes = {}
    study_summaries = {}
    for i in range(len(studies)):
        study = studies[i]
        study['id'] = i
        if 'quote' in study:
            study_quotes[i] = {'quote': study['quote']}
            del study['quote']
        elif 'summary' in study:
            study_summaries[i] = {'summary': study['summary']}
            del study['summary']


    availabilities = get_possibilites(studies,'availability')
    study_types = get_possibilites(studies,'type')
    for study in studies:
        study['availability'] = availabilities[study['availability']]
        study['type'] = study_types[study['type']]
        # process_url(study)

        study['tags'] = study['tags'].split(",")

    with open(folder_name+"studies_metadata.json", 'w') as outfile:
        json.dump(studies, outfile)
    with open(folder_name+"studies_text.json", 'w') as outfile:
        json.dump(study_quotes, outfile)

    #invert these dictionaries for easier usage
    availabilities = dict([[v,k] for k,v in availabilities.items()])
    study_types = dict([[v,k] for k,v in study_types.items()])
    with open(folder_name+"study_availability.json", 'w') as outfile:
        json.dump(availabilities, outfile)
    with open(folder_name+"study_types.json", 'w') as outfile:
        json.dump(study_types, outfile)

def process_url(study):
    if 'url' not in study:
        return
    
    url = study['url']
    sections = url.split('/')

    if "https://www.ncbi.nlm.nih.gov/pmc/articles" in url:
        ncbi_id = sections[len(sections)-1]
        study['ncbi_article'] = ncbi_id
        del study['url']
    if 'https://www.ncbi.nlm.nih.gov/pubmed/' in url:
        ncbi_id = sections[len(sections)-1]
        study['pubmed'] = ncbi_id
        del study['url']

def get_possibilites(studies,key):
    possibilities = {}
    for study in studies:
        val = study[key]
        if val not in possibilities:
            possibilities[val] = len(possibilities) 
    return possibilities