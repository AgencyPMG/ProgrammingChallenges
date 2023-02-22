# S3 bucket
# object store that is set up with default encrytion and private acl

module "s3-bucket" {
  source     = "./modules/s3_bucket/"
  name       = "pmg-challenge-${local.suffix}"
  kms_key_id = module.kms-key.key_id
}
