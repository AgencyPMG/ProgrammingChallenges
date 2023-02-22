# KMS key
# encryption key used for encrypting objects in s3 bucket

module "s3-kms-key" {
  source      = "./modules/kms_key/"
  suffix      = local.suffix
  description = "Encrytion for bucket ${module.s3-bucket.name}"
}
