variable "name" {
  type        = string
  description = "IAM Role Name"
}

variable "trust" {
  type        = string
  description = "Assume role policy JSON"
}

variable "policies" {
  type        = map(string)
  description = "List of IAM policy ARNs to attach to role"
}
