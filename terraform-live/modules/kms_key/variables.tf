variable "suffix" {
  type        = string
  description = "Suffix to append to resource names"
}

variable "description" {
  type        = string
  description = "Description string for KMS key"
  default     = ""
}
