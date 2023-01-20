import unittest
import csvcombiner
class testCSVCombiner(unittest.TestCase):
    def testOneValud(self):
        combiner = csvcombiner.CSVCombiner()
        returnData = combiner.combine(["csvcombiner.py ","./fixtures/accessories.csv"])
        self.assertEqual(returnData, "pass", "Was expecting a CSV to generate but did not")
    def testTwoValid(self):
        combiner = csvcombiner.CSVCombiner()
        returnData = combiner.combine(["csvcombiner.py ","./fixtures/accessories.csv","./fixtures/clothing.csv"])
        self.assertEqual(returnData, "pass", "Was expecting a CSV to generate but did not")
    def testThreeValid(self):
        combiner = csvcombiner.CSVCombiner()
        returnData = combiner.combine(["csvcombiner.py ","./fixtures/accessories.csv","./fixtures/clothing.csv", "./fixtures/household_cleaners.csv"])
        self.assertEqual(returnData, "pass", "Was expecting a CSV to generate but did not")

    def testNonCSVFile(self):
        combiner = csvcombiner.CSVCombiner()
        returnData = combiner.combine(["csvcombiner.py ","./fixtures/notacsv.txt","./fixtures/clothing.csv", "./fixtures/household_cleaners.csv"])
        self.assertEqual(returnData, "A non-csv file was input ./fixtures/notacsv.txt", "Was expecting Non-CSV file error")

    def testNonExistingFile(self):
        combiner = csvcombiner.CSVCombiner()
        returnData = combiner.combine(["csvcombiner.py ","./fixtures/groceries.csv","./fixtures/clothing.csv", "./fixtures/household_cleaners.csv"])
        self.assertEqual(returnData, "A non-existing file was input ./fixtures/groceries.csv", "Was expecting a non-exsisting file error")

    def testNoInputs(self):
        combiner = csvcombiner.CSVCombiner()
        returnData = combiner.combine(["csvcombiner.py "])
        self.assertEqual(returnData, "No valid CSV files input", "Was expecting a no CSV error")

unittest.main()