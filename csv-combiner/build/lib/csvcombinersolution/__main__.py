import requests
import processfiles as processfiles
##import csvcombinersolution.processfiles as processfiles
import sys

response = requests.get('https://httpbin.org/ip')

# print('Your IP is {0}'.format(response.json()['origin']))

def main():
    # Get the file path
    if len(sys.argv) == 0:
        print("This is not a valid command line input.")
        sys.exit(1)
    if len(sys.argv) == 1:
        print("Please provide the file path.")
        sys.exit(1)
    if len(sys.argv) == 2:
        print("Please provide the output file path.")
        sys.exit(1)
    file_paths = sys.argv[1:-1]
    # Process the file name
    source_files = processfiles.processfileName(file_paths)
    # Process the file
    result = processfiles.processfilesContent(source_files)
    # Output the file
    processfiles.outputfile(result, sys.argv[-1])

if __name__ == '__main__':
    main()