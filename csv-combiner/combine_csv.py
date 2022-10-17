import sys
import os
import pandas as pd

class CSVCombiner():

    def __init__(self) -> None:
        pass

    def validate_files(self, argv):
        # check if csv files are provided
        if len(argv) <= 1:
            print("Error: No file-paths input provided.")
            return False

        files = argv[1:]

        for file in files:
            # check if the file exist
            if not os.path.exists(file):
                print("Error: File or directory not found: " + file)
                return False
            # check if the file is empty
            if os.stat(file).st_size == 0:
                print("Warning: The following file is empty: " + file)
                return False
        return True

    def combine(self, argv: list):
        if self.validate_files(argv):

            chunk_list = []
            files = argv[1:]
            # combine the csv files
            for file in files:
                for chunk in pd.read_csv(file, chunksize=10**5):
                    filename = os.path.basename(file)
                    chunk['filename'] = filename
                    chunk_list.append(chunk)
            header = True
            for chunk in chunk_list:
                print(chunk.to_csv(index=False, header=header, chunksize=10**5, line_terminator='\n'), end='')
                header = False
        else:
            return 


    def main(self):
        self.combine(sys.argv)

if __name__ == '__main__':
    obj = CSVCombiner()
    obj.main()