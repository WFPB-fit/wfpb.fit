import json
import pdb

def preprocess_studies(folder_name):
    with open('./research.json') as research:	
        studies = json.load(research)

    #add ID and export 'quotes' to another dictionary
    study_quotes = {}
    for i in range(len(studies)):
        study = studies[i]
        study['id'] = i
        if 'quote' in study:
            study_quotes[i] = {'quote': study['quote']}
            del study['quote']
    

    
    with open('../src/assets/data/study_metadata_names.json') as metadata_file:	
        metadata = json.load(metadata_file)
    availabilities = invert_dict(metadata['availability'])
    study_types = invert_dict(metadata['types'])
    for study in studies:
        study['availability'] = availabilities[study['availability']]
        study['type'] = study_types[study['type']]
        # process_url(study)

        study['tags'] = study['tags'].split(",")
        for i in range(len(study['tags'])):
            study['tags'][i] = study['tags'][i].lower()

    with open(folder_name+"studies_metadata.json", 'w') as outfile:
        json.dump(studies, outfile)
    with open(folder_name+"studies_text.json", 'w') as outfile:
        json.dump(study_quotes, outfile)

    #invert these dictionaries for easier usage
    # availabilities = invert_dict(availabilities)
    # study_types = invert_dict(study_types)
    # pdb.set_trace()
    # with open(folder_name+"study_availability.json", 'w') as outfile:
    #     json.dump(availabilities, outfile)
    # with open(folder_name+"study_types.json", 'w') as outfile:
    #     json.dump(study_types, outfile)

def invert_dict(d):
    return dict([[v,k] for k,v in d.items()])

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