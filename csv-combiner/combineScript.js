/*
Alice Huong Nguyen - Coding Challenge Solution
- How to run:
Install require packages include csv-parser and csv-write-stream:
 npm install csv-parser
 npm install csv-write-stream

- Run the below command in terminal:
node combineScript.js ./fixtures/accessories.csv ./fixtures/clothing.csv ./fixtures/household_cleaners.csv combined.csv
*/

/*
I use stream to handle reading and writing to csv files in case the files are large
If I use regular fs.readFile or fs.writeFile the script won't be able to handle the large files due to memory
*/

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const csvWriter = require('csv-write-stream')

//get the files that are passed in command line arguments by skipping the first 2
//For example: node combiner.js ./fixtures/accessories.csv ./fixtures/clothing.csv ./household_cleaners.csv combine.csv
//the argv array will contain ['node', 'combiner.js', './fixtures/accessories.csv', './fixtures/clothing.csv'. './fixtures/householdc_cleaners.csv', 'combine.csv']
//by slicing the first 2 items in the array, we got the files array as: ['./fixtures/accessories.csv', './fixtures/clothing.csv'. './fixtures/householdc_cleaners.csv', 'combine.csv'] 
let files = process.argv.slice(2);

//retrieve the name of the file to write, this is the last element of the files array, hence files.length - 1
const fileToWrite = files[files.length - 1];

//open a write stream
const writeStream = fs.createWriteStream(fileToWrite);

//create a csv write with the column headers
const writer = csvWriter({ headers: ["email_hash", "category", "filename"] })

//pipe the csv writer to the write stream
writer.pipe(writeStream);

//function to process a file
//reads the file as stream, then add file name to each row, and write to csv file
function processFile(file) {
    //use Promise for asynchronous handling of ile
    return new Promise((resolve, reject) => {
        //read the file in stream
        fs.createReadStream(files[file])

        //on error return error
        .on('error', error => {
            reject(error);
        })

        //pipe the csv parser
        //this will parse the csv rows as json objects
        .pipe(csv())

        //on data stream
        .on('data', (row) => {

            //get the file name from the files array
            //call path.basename() to retrieve the file name only
            //For example path.basename("./fixtures/accessories.csv") will return accessories.csv
            const filename = path.basename(files[file]);

            //add a filename key value pair to the JSON object 
            row["filename"] = filename;

            //remove backslash to clean up data
            //For example: \"Gingham\" Shirt => "Gingham" Shirt
            row["category"] = row["category"].replace(/\\/g, '');

            //write row to csv file
            writer.write(row);
        })

        //on end return success
        .on('end', () => {
            resolve("Success");
        });
    });
}

//function to read and print csv file using stream
function printFile(file) {
    fs.createReadStream(file)
        .on('error', error => {
            reject(error);
        })
        .pipe(csv())
        .on('data', (row) => {
            console.log(row);
        })
        .on('end', () => {
            console.log("Successfully read and print file to stdout!");
        });
}

//function to process all files in files array and call processFile() function
async function combine() {

    //loop through files array, skip the last element of files array because it is the file to write, hence files.length - 1 
    for (let i = 0; i < files.length - 1; i++) {
        try {
            //call processFile function
            await processFile(i);
        } catch (error) {
            console.log('Error while processing files.');
        }
    }

    //close the write stream
    writer.end();

    //call printFile function to read and print the combined file to stdout as json objects
    printFile(fileToWrite);
}

//call combine() function to execute
combine();