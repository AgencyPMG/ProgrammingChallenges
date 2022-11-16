import requests
import csvcombinersolution.processfiles as processfiles
##import csvcombinersolution.processfiles as processfiles
import sys
import os

response = requests.get('https://httpbin.org/ip')

# print('Your IP is {0}'.format(response.json()['origin']))

def main():
    # Get the file path
    if len(sys.argv) == 0:
        print("This is not a valid command line input.")
    if len(sys.argv) == 1:
        print("Please provide the file path.")
    if len(sys.argv) == 2:
        print("Please provide the output file path.")
    if len(sys.argv) >= 3:
        if not sys.argv[-1].endswith('.csv'):
            print("Please provide the output file name with .csv extension.")
        else:
            if (os.path.exists(sys.argv[-1])):
                os.remove(sys.argv[-1])
            file_paths = sys.argv[1:-1]
            # Process the file name
            source_files = processfiles.processfileName(file_paths)
            # Process the file
            # result = processfiles.processfilesContent(source_files)
            # Process large files and Output the file to CSV file
            processfiles.processLargeFiles(source_files, sys.argv[-1])
            # Output the file
            #processfiles.outputfile(result, sys.argv[-1])

if __name__ == '__main__':
    main()