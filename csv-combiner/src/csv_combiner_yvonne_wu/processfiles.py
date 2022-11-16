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
            sys.exit(1)
        if not path.endswith('.csv'):
            print("File is not a CSV file: " + path)
            sys.exit(1)
        if path == None:
            print("File is empty: " + path)
            sys.exit(1)
        try:
            surce_file.append(open(path, 'r'))
        except:
            print("Invalid file format. Please try again.")
            sys.exit(1)
    return surce_file

def processfiles(source_files):
    # path = 'fixtures'
    # source_files = sorted(Path(path).glob('*.csv'))
    # Extrac file data
    result = pd.DataFrame()
    for file in source_files:
        file_content = pd.read_csv(file)
        file_content['filename'] = file.name
        result = pd.concat([file_content], ignore_index=True)
    return result

def outputfile(result, output_path):
    # Output the file to CSV file
    result.to_csv(output_path, index=False)
    # Print the result in command line
    sys.stdout.write(tabulate(result, headers='keys', tablefmt='fancy_grid', showindex=False))
    #display(df)

if __name__ == '__main__':
    # Get the file path
    file_paths = sys.argv[1:-1]
    # Process the file name
    source_files = processfileName(file_paths)
    # Process the file
    result = processfiles(source_files)
    # Output the file
    outputfile(result, sys.argv[-1])