#So for the sake of this project, I am assuming that all of the files have
#All of the same columns as defined in the README since all the CSV's in fixtures
#have the same file
import os
import pandas as pd
import sys
import argparse
import dask.dataframe as dd
from datetime import datetime

class CSVCombiner:
    def parseArgs(self, argv: list): #This parses the input args, creates a list for all of the valid files and returns it
        if len(argv) <= 1: #This is the case when no parameters are input by user
            return "No valid CSV files input"

        returner = []
        for arg in argv[1:]:
            #Go through each input argument and check if it points to a file
            #Also need to ensure that each file is a .csv file
            if os.path.exists(arg):
                #now ensure that the file type is .csv
                if arg.lower().endswith(".csv"):
                    returner.append(arg)
                else:
                    return "A non-csv file was input " + arg
            else:
                return "A non-existing file was input " + arg
        
        return returner

    def combine(self, argv: list): 
        validList = self.parseArgs(argv)
        if type(validList) == str:
            return validList

        #go throught the valid CSV files and combine them
        dataFrames = [] #list to hold data frames
        for fileName in validList: #iterate through each csv
            myDf = dd.read_csv(fileName) #Read the data in the file
            myDf["filename"] = os.path.basename(fileName) #create the column for the filename
            dataFrames.append(myDf) #add to the dataframes list
                
        #Now actually make the output file
        first = True

        for df in dataFrames:
            pandasDf = df.compute() #Convert Dask --> Pandas
            if first:
                print(pandasDf.to_string(index = False))
                first = False
            else:
                print(pandasDf.to_string(index = False, header = False))
                #pandasDf.to_csv(fileName1, index = False, header = False, mode = 'a')
        return "pass"
def main():
    combiner = CSVCombiner() #Call the CSVcombiner and pass through the arguments
    combiner.combine(sys.argv)
if __name__ == '__main__':
    main()