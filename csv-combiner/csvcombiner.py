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
        
        if len(argv) == 1: #This is the case when no parameters are input by user
            print("No CSV parameters input by user")
            return [] 

        returner = []
        for arg in argv[1:]:
            #Go through each input argument and check if it points to a file
            #Also need to ensure that each file is a .csv file
            if os.path.exists(arg):
                #now ensure that the file type is .csv
                if arg.lower().endswith(".csv"):
                    returner.append(arg)
                else:
                    print("File ", arg, " is not a .csv file and will not be combined")

            else:
                print("File ", arg, " does not exist")
        
        if len(returner) == 0:
            print("Warning: No valid CSV files were input")
        
        return returner
    
    def generateFileString(self): #This creates a file name using the datetime for output file
        now = datetime.now()
        s1 = now.strftime("%m_%d_%Y_%H_%M_%S")
        return "combined_" + s1 + ".csv"

    def combine(self, argv: list): 
        validList = self.parseArgs(argv)
        if len(validList) == 0:
            return #If no valid CSV files present, stop
        fileName1 = self.generateFileString()
        #go throught the valid CSV files and combine them
        #the 1st file will need to do the headers, rest dont need to do the headers
        CHUNK_SIZE = 50000 #This is for settign a max bound for file load in memory
        output_file = "output1.csv"
        #create the initial file with headers
        dataFrames = [] #list of all of my dataframes
        for fileName in validList:
            myDf = dd.read_csv(fileName) #Read the data in the file
            myDf["filename"] = os.path.basename(fileName) #create the column for the filename
            dataFrames.append(myDf) #add to the dataframes list
                
        #Now actually make the output file
        first = True

        for df in dataFrames:
            pandasDf = df.compute() #Convert Dask --> Pandas

            if first:
                pandasDf.to_csv(fileName1, index = False)
                first = False
            else:
                pandasDf.to_csv(fileName1, index = False, header = False, mode = 'a')

def main():
    print("CSV Combiner for PMG Test")
    combiner = CSVCombiner() #Call the CSVcombiner and pass through the arguments
    combiner.combine(sys.argv)
if __name__ == '__main__':
    main()