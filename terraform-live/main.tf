# main.tf
# Defines shared things such as providers, shared locals, etc

terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
  required_version = ">= 1.3"
}

provider "aws" {
  region = "us-east-1"
}

resource "random_pet" "suffix" {
}

locals {
  suffix = random_pet.suffix.id
}

# This is a reference to BigCorp's IAM user with whom we want to establish
# trust so they can assume our S3 role
data "aws_iam_user" "challenge" {
  user_name = "terraform-challenge"
}

resource "local_file" "test-data" {
  filename             = "${path.module}/test_data.json"
  file_permission      = "0644"
  directory_permission = "0755"

  content = jsonencode({
    "s3_bucket_name"    = module.s3-bucket.name
    "role_session_name" = "PMGTFLive-${local.suffix}"
    "role_arn"          = module.s3-role.arn
  })
}
