variable "name" {
  type        = string
  description = "S3 Bucket Name"
}

variable "kms_key_id" {
  type        = string
  description = "KMS Key ID used to encrypt bucket objects"
}
