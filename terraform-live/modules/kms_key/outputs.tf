output "key_id" {
  description = "The KMS key ID we use to encrypt S3 objects by default"
  value       = aws_kms_key.this.id
}

output "encrypt_arn" {
  description = "The IAM policy ARN which allows us to encrypt S3 objects"
  value       = aws_kms_key.this.id
}

output "decrypt_arn" {
  description = "The IAM policy ARN which allows us to decrypt S3 objects"
  value       = aws_kms_key.this.id
}
