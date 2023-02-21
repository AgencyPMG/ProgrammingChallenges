variable "suffix" {
  type        = string
  description = "Unique suffix added to resource names"
}

variable "s3_bucket_arn" {
  description = "S3 bucket ARN for read/write policies"
}
