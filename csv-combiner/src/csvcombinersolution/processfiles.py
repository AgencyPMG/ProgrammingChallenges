import csv
import pandas as pd
import glob
from pathlib import Path
import os
from tabulate import tabulate
import sys

def processfileName(file_paths):
    # Process the file name
    surce_file = []
    # Check whether the file is valid and csv file
    for path in file_paths:
        if not os.path.isfile(path):
            print("File does not exist: " + path)
        if not path.endswith('.csv'):
            print("File is not a CSV file: " + path)
        if path == None:
            print("File is empty: " + path)
        try:
            surce_file.append(open(path, 'r'))
        except:
            print("Invalid file format. Please try again for " + path)
    return surce_file

def processLargeFiles(source_files, output_path):
    # Process large files and output the file to CSV file by chunk
    result = pd.DataFrame()
    for file in source_files:
        file_content = pd.read_csv(file, chunksize=1000)
        for chunk in file_content:
            chunk['filename'] = file.name.split('/')[-1]
            # This part con contains further logic to process the data
            chunk['category'] = chunk['category'].apply(lambda x: x.replace('\"', '').replace('\\', ''))
            chunk.to_csv(output_path, mode='a', header=False, index=False)
            # Potentially do something to the chunk here
            # Such as print

####################################
#     initial code and solution
####################################

# Combined with outputfile() function to handle small files and print files in command line
def processfilesContent(source_files):
    # path = 'fixtures'
    # source_files = sorted(Path(path).glob('*.csv'))
    # Extrac file data
    result = pd.DataFrame()
    for file in source_files:
        file_content = pd.read_csv(file)
        file_content['filename'] = file.name.split('/')[-1]
        # This part con contains further logic to process the data
        # eg. file_content['column_name'] = file_content['column_name'].apply(lambda x: x.strip())
        # file_content['category'] = file_content['category'].apply(lambda x: x.replace('\"', '').replace('\\', ''))
        # It can also iterate all the columns and apply the same logic
        for column in file_content.columns:
            file_content[column] = file_content[column].apply(lambda x: x.replace('\"', '').replace('\\', ''))
        #    ...
        result = pd.concat([file_content], ignore_index=True)
    return result

def outputfile(result, output_path):
    # Output the file to CSV file
    result.to_csv(output_path, index=False)
    # Print the result in command line
    # sys.stdout.write(tabulate(result, headers='keys', tablefmt='fancy_grid', showindex=False))
    #display(df)