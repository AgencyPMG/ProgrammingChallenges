process.argv = ['node', 'combineScript.js', './fixtures/accessories.csv', './fixtures/clothing.csv', './fixtures/household_cleaners.csv', 'combined.csv'];

const combine = require("../combineScript.js");
var fs = require('fs');
var expect = require('chai').expect;

describe("Test CSV combine script", function() {
    it("Should work as expected", async function() {
        //file combine.csv should exists
        expect(fs.existsSync("combined.csv")).to.be.true;

        //file combine.csv should contain "filename" and "accessories.csv" string
        contents = fs.readFileSync("combined.csv", 'utf-8');
        contained = contents.includes("filename")
        expect(contained).to.be.true;
        contained2 = contents.includes("accessories.csv")
        expect(contained2).to.be.true;
    })
})