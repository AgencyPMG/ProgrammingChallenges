locals {
  public_subnets = [
    cidrsubnet(var.vpc_cidr, 8, 0),
    cidrsubnet(var.vpc_cidr, 8, 1),
  ]

  private_subnets = [
    cidrsubnet(var.vpc_cidr, 8, 8),
    cidrsubnet(var.vpc_cidr, 8, 9),
  ]
}

resource "random_pet" "unique" {
  length    = 2
  separator = "-"
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "ops-challenge-${random_pet.unique.id}"
  cidr = var.vpc_cidr

  azs = [
    data.aws_availability_zones.available.names[0],
    data.aws_availability_zones.available.names[1],
  ]
  public_subnets  = local.public_subnets
  private_subnets = local.private_subnets

  enable_nat_gateway = true
  single_nat_gateway = true

  enable_dns_hostnames = true
  enable_dns_support   = true
}

module "server-sg" {
  source = "terraform-aws-modules/security-group/aws//modules/ssh"

  name   = "${random_pet.unique.id}-ssh"
  vpc_id = module.vpc.vpc_id

  ingress_cidr_blocks = ["0.0.0.0/0"]
}
