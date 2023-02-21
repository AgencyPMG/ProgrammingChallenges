variable "principals" {
  type = list(object({
    type        = string,
    identifiers = list(string)
  }))
  description = "List of IAM principals allowed to sts:AssumeRole"
  default     = []
}
