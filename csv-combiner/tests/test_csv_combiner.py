import pytest
# Import the module to test
from csv_combiner_yvonne_wu import processfiles as processfiles

class Tests:
    @pytest.fixture
    def example_fixture(self):
        '''
        An example of a pytest fixture - a function that can be used for setup and teardown before and after test functions are run.
        '''
        yield 
    
    @pytest.fixture
    def test_sanity_check(self, example_fixture):
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
    def test_processfileName():
        # Test the file name
        file_paths = ['fixtures/1.csv', 'fixtures/2.csv']
        source_files = processfiles.processfileName(file_paths)
        assert source_files[0].name == '1.csv'
        assert source_files[1].name == '2.csv'
    
    # Test the file name
    def test_processfileName_empty():
        # Test the file name
        file_paths = []
        source_files = processfiles.processfileName(file_paths)
        assert source_files == []

    # Test the file name
    def test_processfileName_invalid():
        # Test the file name
        file_paths = ['fixtures/1.exl', 'fixtures/2.txt']
        source_files = processfiles.processfileName(file_paths)
        assert source_files == []
    

