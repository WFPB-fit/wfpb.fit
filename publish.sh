cd offline_data_parsing/
python3 run_preprocess_data.py
cd ..

git add -A
git commit -m "$1"
git push origin master