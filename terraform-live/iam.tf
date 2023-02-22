# S3 role
# Ths role can be assumed by our IAM user and allows us to read and write to the 
# s3 bucket.

module "s3-role" {
  source = "./modules/iam_role/"
  name   = "challenge-s3-${local.suffix}"
  trust  = module.iam-trust.policy_json
  policies = {
    "s3-read" = module.s3-policy.read_arn,
    # TODO figure out what other policies we need here
  }
}

module "iam-trust" {
  source = "./modules/iam_trust/"
  principals = [{
    type = "AWS"
    identifiers = [
      # TODO set the client's iam user arn here to establish trust
    ]
  }]
}

module "s3-policy" {
  source        = "./modules/s3_iam_policy/"
  suffix        = local.suffix
  s3_bucket_arn = module.s3-bucket.arn
}
