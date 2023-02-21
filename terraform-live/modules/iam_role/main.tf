resource "aws_iam_role" "this" {
  name               = var.name
  assume_role_policy = var.trust
}

resource "aws_iam_role_policy_attachment" "this" {
  for_each = var.policies

  role       = aws_iam_role.this.name
  policy_arn = each.value
}
