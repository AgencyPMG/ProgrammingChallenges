#!/usr/bin/env python3

import os
import json
import boto3
import pytest
import botocore
import datetime
from dateutil.tz import tzlocal
from botocore.exceptions import ClientError

class TestS3Permissions:

    def setup_class(self):

        test_data = json.load(open('test_data.json'))
        self.s3_bucket_name = test_data['s3_bucket_name']

        sts = boto3.client('sts')

        creds = sts.assume_role(
            RoleArn=test_data['role_arn'],
            RoleSessionName=test_data['role_session_name'],
        )['Credentials']

        session = boto3.session.Session(
            region_name='us-east-1',
            aws_access_key_id=creds['AccessKeyId'],
            aws_secret_access_key=creds['SecretAccessKey'],
            aws_session_token=creds['SessionToken'],
        )

        assumed_sts = session.client('sts')

        self.s3 = session.client('s3')

        self.object_key = 'testfile'
        self.object_body = b'this is a test'

    def test_list(self):
        """
        We should not allow listing of all buckets
        """
        with pytest.raises(ClientError):
            response = self.s3.list_buckets()

    def test_put_object(self):
        """
        We should be able to put an object to the bucket
        """
        response = self.s3.put_object(
            Bucket=s3_bucket_name,
            Key=self.object_key,
            Body=self.object_body,
        )

    def test_list_objects(self):
        """
        We should be able to list objects in the bucket
        """
        response = self.s3.list_objects_v2(
            Bucket=s3_bucket_name,
            Prefix='testfile'
        )
        assert self.object_key == response['Contents'][0]['Key']

    def test_get_object(self):
        """
        We should be able to get the object that we put earlier
        """
        response = self.s3.get_object(
            Bucket=s3_bucket_name,
            Key='testfile'
        )
        print(response)
        assert self.object_body == response['Body'].read()
