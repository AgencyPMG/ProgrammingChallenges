resource "aws_kms_key" "this" {
  description = var.description
}

resource "aws_kms_alias" "this" {
  name          = "alias/challenge-${var.suffix}"
  target_key_id = aws_kms_key.this.arn
}

resource "aws_iam_policy" "encrypt" {
  name   = "challenge-encrypt-${var.suffix}"
  policy = data.aws_iam_policy_document.encrypt.json
}

data "aws_iam_policy_document" "encrypt" {
  statement {
    sid = "AllowEncrypt"
    actions = [
      "kms:GenerateDataKey",
    ]
    resources = [
      aws_kms_key.this.arn
    ]
  }
}

resource "aws_iam_policy" "encrypt" {
  name   = "challenge-encrypt-${var.suffix}"
  policy = data.aws_iam_policy_document.decrypt.json
}

data "aws_iam_policy_document" "decrypt" {
  statement {
    sid = "AllowDecrypt"
    actions = [
      "kms:Decrypt",
    ]
    resources = [
      aws_kms_key.this.arn
    ]
  }
}
