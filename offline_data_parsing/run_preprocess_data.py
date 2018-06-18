import fetch_foods
import process_studies
import os
import shutil

export_folder = "../src/assets/data/preprocessed_data/"
shutil.rmtree(export_folder)
os.makedirs(export_folder)
fetch_foods.format_and_save_usda_food_data(export_folder)
process_studies.preprocess_studies(export_folder)