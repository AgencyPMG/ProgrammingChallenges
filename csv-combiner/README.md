![Python build & test](https://github.com/Yvonne511/PMG-ProgrammingChallenges-Yvonne-Wu/csv-combiner/actions/workflows/build.yaml/badge.svg)

# Solution Documentation
There are four functions available for the project 

#### processfileName()
It ensures that all file names being inputted are correct and have corresponding physical files

#### processLargeFiles()
It combines all the files together as a final csv file based on the output path specified in the command line
During testing, it has the ability to process a cvs file of 8GB

#### processfilesContent() and outputfile()
Both functions together can provide a quick combination for small files that will output file content in a neat way in the command line

There are two ways of running the project:
You can run 

`python csvcombinersolution/__main__.py fixtures/accessories.csv fixtures/clothing.csv combined.csv` 

`python3 csvcombinersolution/__main__.py fixtures/accessories.csv fixtures/clothing.csv combined.csv` 

or other related commands based on your python version
to convert and combine the files
You can also install package to run the progam

### Setup

#### Setup the virtual environment

1. Install pipenv with `python3 -m pip install --user pipenv`
2. Create the virtual environment and install this package `pip install -i https://test.pypi.org/simple/ csv-combiner-solution==1.0.1`
3. Activate the environment with `pipenv shell`
4. Exit the virtual environment with `exit`

Build the package with `python -m build`

#### Test with pytest

1. Install pytest into your vitural environment with `pipenv install pytest`
2. Run `python3 -m pytest` from the main directory

# PyPi 

PyPi: https://test.pypi.org/project/csv-combiner-solution/1.0.1/


# CSV Combiner Question

Write a command line program that takes several CSV files as arguments. Each CSV
file (found in the `fixtures` directory of this repo) will have the same
columns. Your script should output a new CSV file to `stdout` that contains the
rows from each of the inputs along with an additional column that has the
filename from which the row came (only the file's basename, not the entire path).
Use `filename` as the header for the additional column.

##  Considerations
* You should use coding best practices. Your code should be re-usable and extensible.
* Your code should be testable by a CI/CD process. 
* Unit tests should be included.

## Example
This example is provided as one of the ways your code should run. It should also be
able to handle more than two inputs, inputs with different columns, and very large (> 2GB) 
files gracefully.

```
$ ./csv-combiner.php ./fixtures/accessories.csv ./fixtures/clothing.csv > combined.csv
```

Given two input files named `clothing.csv` and `accessories.csv`.

|email_hash|category|
|----------|--------|
|21d56b6a011f91f4163fcb13d416aa4e1a2c7d82115b3fd3d831241fd63|Shirts|
|21d56b6a011f91f4163fcb13d416aa4e1a2c7d82115b3fd3d831241fd63|Pants|
|166ca9b3a59edaf774d107533fba2c70ed309516376ce2693e92c777dd971c4b|Cardigans|

|email_hash|category|
|----------|--------|
|176146e4ae48e70df2e628b45dccfd53405c73f951c003fb8c9c09b3207e7aab|Wallets|
|63d42170fa2d706101ab713de2313ad3f9a05aa0b1c875a56545cfd69f7101fe|Purses|

Your script would output

|email_hash|category|filename|
|----------|--------|--------|
|21d56b6a011f91f4163fcb13d416aa4e1a2c7d82115b3fd3d831241fd63|Shirts|clothing.csv|
|21d56b6a011f91f4163fcb13d416aa4e1a2c7d82115b3fd3d831241fd63|Pants|clothing.csv|
|166ca9b3a59edaf774d107533fba2c70ed309516376ce2693e92c777dd971c4b|Cardigans|clothing.csv|
|176146e4ae48e70df2e628b45dccfd53405c73f951c003fb8c9c09b3207e7aab|Wallets|accessories.csv|
|63d42170fa2d706101ab713de2313ad3f9a05aa0b1c875a56545cfd69f7101fe|Purses|accessories.csv|

