import pytest
import pandas as pd
import sys
import os
# Import the module to test
from csvcombinersolution import processfiles as processfiles

class Tests:
    @pytest.fixture
    def example_fixture(self):
        '''
        An example of a pytest fixture - a function that can be used for setup and teardown before and after test functions are run.
        '''
        yield 
    
    @pytest.fixture
    def test_sanity_check(self):
        """
        Test debugging... making sure that we can run a simple test that always passes.
        Note the use of the example_fixture in the parameter list - any setup and teardown in that fixture will be run before and after this test function executes
        From the main project directory, run the `python3 -m pytest` command to run all tests.
        """
        expected = True # the value we expect to be present
        actual = True # the value we see in reality
        assert actual == expected, "Expected True to be equal to True!"
    
    ####################################
    #      test file name processor
    ####################################

    # Test the file name
    def test_processfileName(self):
        # Test the file name
        file_paths = ['fixtures/1.csv', 'fixtures/2.csv', 'fixtures/clothing.csv']
        source_files = processfiles.processfileName(file_paths)
        assert len(source_files) == 1
    
    # Test the file name
    def test_processfileName_empty(self):
        # Test the file name
        file_paths = []
        source_files = processfiles.processfileName(file_paths)
        assert source_files == []

    # Test the file name
    def test_processfileName_invalid(self):
        # Test the file name
        file_paths = ['fixtures/1.exl', 'fixtures/2.txt']
        source_files = processfiles.processfileName(file_paths)
        assert source_files == []
    
    ####################################
    #      test file to csv processor
    ####################################

    def test_processfilesContent(self):
        file_path = 'fixtures/clothing.csv'
        source_files = [open(file_path, 'r')]
        # Process the file
        result = processfiles.processfilesContent(source_files)
        assert isinstance(result, pd.DataFrame), f"Expected get() to return a dataframe. Instead, it returned {result}"

    def test_processfilesContent_empty(self):
        # file_path = 'fixtures/clothing.csv'
        source_files = []
        # Process the file
        result = processfiles.processfilesContent(source_files)
        assert isinstance(result, pd.DataFrame), f"Expected get() to return a dataframe. Instead, it returned {result}"

    def test_processfilesContent_large(self):
        # file_path = 'tests/example.csv'
        file_path = 'fixtures/clothing.csv'
        source_files = [open(file_path, 'r'), open(file_path, 'r'), open(file_path, 'r'), open(file_path, 'r')]
        # Process the file
        result = processfiles.processfilesContent(source_files)
        assert isinstance(result, pd.DataFrame), f"Expected get() to return a dataframe. Instead, it returned {result}"

    ####################################
    #      test export csv file processor
    ####################################  

    def test_processLargeFiles(self):
        # file_path = 'tests/example.csv'
        file_path = 'fixtures/clothing.csv'
        source_files = [open(file_path, 'r')]
        # Process the file
        output_path = 'combined.csv'
        processfiles.processLargeFiles(source_files, output_path)
        assert os.path.getsize(file_path) < os.path.getsize(output_path)

    def test_processLargeFiles_empty(self):
        source_files = []
        # Process the file
        output_path = 'test_ouput.csv'
        # This file should not be created during implementation, it is specifically for testing
        processfiles.processLargeFiles(source_files, output_path)
        assert not os.path.exists(output_path)

    ####################################
    #      test export csv file processor
    ####################################

    def test_outputfile(self):
        # file_path = 'tests/example.csv'
        file_path = 'fixtures/clothing.csv'
        source_files = [open(file_path, 'r')]
        # Process the file
        result = processfiles.processfilesContent(source_files)
        output_path = 'combined.csv'
        processfiles.outputfile(result, output_path)
        assert result is not None
