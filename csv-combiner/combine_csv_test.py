import pandas as pd
import sys
import generator_test
import unittest
import os
from combine_csv import CSVCombiner
from io import StringIO


class TestCombineMethod(unittest.TestCase):

    # initialize all paths
    test_out_path = "./test_output.csv"
    csv_combine_path = "./combine_csv.py"
    accessories_path = "./test_fixtures/accessories.csv"
    clothing_path = "./test_fixtures/clothing.csv"
    hc_path = "./test_fixtures/household_cleaners.csv"
    empty_path = "./test_fixtures/empty_file.csv"

    # initialize the test output
    backup = sys.stdout
    test_output = open(test_out_path, 'w+')
    combiner = CSVCombiner()

    @classmethod
    def setUpClass(cls):
        # generate the test fixture files located in ./test_fixtures/
        generator_test.main()

        # redirect the output to ./test_output.csv
        sys.stdout = cls.test_output

    @classmethod
    def tearDownClass(cls):

        cls.test_output.close()

        if os.path.exists(cls.accessories_path):
            os.remove(cls.accessories_path)
        if os.path.exists(cls.clothing_path):
            os.remove(cls.clothing_path)
        if os.path.exists(cls.hc_path):
            os.remove(cls.hc_path)
        if os.path.exists(cls.empty_path):
            os.remove(cls.empty_path)
        if os.path.exists(cls.test_out_path):
            os.remove(cls.test_out_path)
        if os.path.exists("./test_fixtures"):
            os.rmdir("./test_fixtures")

    def setUp(self):
        # setup
        self.output = StringIO()
        sys.stdout = self.output
        self.test_output = open(self.test_out_path, 'w+')

    def tearDown(self):
        self.test_output.close()
        self.test_output = open(self.test_out_path, 'w+')
        sys.stdout = self.backup
        self.test_output.truncate(0)
        self.test_output.write(self.output.getvalue())
        self.test_output.close()

    def test_no_file_paths(self):

        # run combine_csv with no arguments
        argv = [self.csv_combine_path]
        self.combiner.combine(argv)

        self.assertIn("Error: No file-paths input provided.", self.output.getvalue())

    def test_empty_files(self):

        # run combine_csv with an empty file
        argv = [self.csv_combine_path, self.empty_path]
        self.combiner.combine(argv)

        self.assertIn("Warning: The following file is empty: ", self.output.getvalue())

    def test_non_existent_files(self):

        # run combine_csv with a file that doesn't exist
        argv = [self.csv_combine_path, "non_existent.csv"]
        self.combiner.combine(argv)

        self.assertTrue("Error: File or directory not found:" in self.output.getvalue())

    def test_filename_column_added(self):

        # run combine_csv with valid arguments
        argv = [self.csv_combine_path, self.accessories_path, self.clothing_path]
        self.combiner.combine(argv)

        # update the test_output.csv file
        self.test_output.write(self.output.getvalue())
        self.test_output.close()

        # check if the column exists in the produced data-frame
        with open(self.test_out_path) as f:
            df = pd.read_csv(f)
        self.assertIn('filename', df.columns.values)

    def test_filename_added_to_rows(self):
        # run combine_csv with valid arguments
        argv = [self.csv_combine_path, self.accessories_path, self.clothing_path]
        self.combiner.combine(argv)

        # update the test_output.csv file
        self.test_output.write(self.output.getvalue())
        self.test_output.close()

        # check if a filename value exists in the produced data-frame
        with open(self.test_out_path) as f:
            df = pd.read_csv(filepath_or_buffer=f, lineterminator='\n')
        self.assertIn('accessories.csv', df['filename'].tolist())

    def test_all_values_exist_in_combined(self):

        # run combine_csv with valid arguments
        argv = [self.csv_combine_path, self.accessories_path, self.clothing_path,
                self.hc_path]
        self.combiner.combine(argv)

        # update the test_output.csv file
        self.test_output.write(self.output.getvalue())
        self.test_output.close()

        # open all test data-frames

        acc_df = pd.read_csv(filepath_or_buffer=self.accessories_path, lineterminator='\n')
        clo_df = pd.read_csv(filepath_or_buffer=self.clothing_path, lineterminator='\n')
        hc_df = pd.read_csv(filepath_or_buffer=self.hc_path, lineterminator='\n')

        # ensure that all data from the fixtures exist in the resulting combined csv file

        with open(self.test_out_path) as f:
            combined_df = pd.read_csv(filepath_or_buffer=f, lineterminator='\n')
        self.assertEqual(len(combined_df.merge(acc_df)), len(combined_df.drop_duplicates()))
        self.assertEqual(len(combined_df.merge(clo_df)), len(combined_df.drop_duplicates()))
        self.assertEqual(len(combined_df.merge(hc_df)), len(combined_df.drop_duplicates()))

