output "read_arn" {
  value = aws_iam_policy.s3-read.arn
}

output "write_arn" {
  value = aws_iam_policy.s3-write.arn
}
