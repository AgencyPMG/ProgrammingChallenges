# Terraform Live Coding Challenge

Imagine a scenario:  It's come to your attention that our client BigCorp needs access 
to an S3 bucket to read and write important data to be shared with our ETL 
processes.  Your teammate who was responsible for finishing the project had to
be out unexpectedly and you've been asked to complete the project.  You'll find
some terraform code that mostly works and a pytest suite to validate that the
bucket and role meets the client's needs for permissions and default
encryption.

## What we'll do

Together we will modify the terraform code to allow an IAM
user (the client, BigCorp) to assume the role in order to read and write files 
in the S3 bucket.  Some of the resources are provided, but your teammate has
left some TODOs around the code so we must ensure terraform has what it needs 
to run and fill in the missing pieces and correct any mistakes your collegue 
may have made along the way.

## What's Provided?

We will provide a Github CodeSpaces environment with terraform and python
preinstalled and temporary AWS credentials to you in order to complete the 
challenge.

The following resources will be defined in terraform.

- Provider config in `main.tf`
- S3 Bucket, defined in `s3.tf`, using `modules/s3_bucket`
- IAM role, defined in `iam.tf`, using `modules/iam_role`
- S3 IAM policy allowing read and write access to S3, defined in `iam.tf`, 
  using `modules/s3_iam_policy`
- KMS key, defined in `kms.tf`, using `modules/kms_key`


Additionally, an IAM user representing the client is already configured and 
will have your temporary credentials attached to it.  Our pytest suite will use
the user to assume the IAM role and attempt to read, write and list objects in
the bucket.  And one very important note, we want to take care not to expose 
all of our other buckets to the client, so the test will attempt to list our other
buckets, and if it can, it will fail.

## Test Suite

Our tests are run using `pytest` in the terminal and should result in 4 
passing tests.
