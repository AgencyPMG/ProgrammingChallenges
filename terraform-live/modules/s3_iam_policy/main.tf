resource "aws_iam_policy" "s3-read" {
  name   = "challenge-s3-read-${var.suffix}"
  policy = data.aws_iam_policy_document.s3-read.json
}

data "aws_iam_policy_document" "s3-read" {
  statement {
    sid    = "AllowReadObjects"
    effect = "Allow"
    actions = [
      "s3:GetObject",
    ]
    resources = [
      "${var.s3_bucket_arn}/*",
    ]
  }

  statement {
    sid    = "AllowListBucket"
    effect = "Allow"
    actions = [
      "s3:ListBucket",
    ]
    resources = [
      var.s3_bucket_arn,
    ]
  }
}

resource "aws_iam_policy" "s3-write" {
  name   = "challenge-s3-write-${var.suffix}"
  policy = data.aws_iam_policy_document.s3-write.json
}

data "aws_iam_policy_document" "s3-write" {
  statement {
    sid    = "AllowWriteObjects"
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:DeleteObject",
    ]
    resources = [
      "${var.s3_bucket_arn}/*",
    ]
  }
}
