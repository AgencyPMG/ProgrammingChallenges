# do not modify this file, your module must implement this interface
module "challenge" {
  source = "./instance/"

  ami_id             = data.aws_ami.ubuntu.id
  subnet_id          = module.vpc.public_subnets[0]
  availability_zone  = module.vpc.azs[0]
  instance_type      = "t3.micro"
  ssh_key_name       = aws_key_pair.challenge.key_name
  security_group_ids = [module.server-sg.security_group_id]
  root_volume_type   = "gp2"
  root_volume_size   = "10"
  ebs_volume_type    = "gp2"
  ebs_volume_size    = "100"

  user_data = <<-EOT
  #!/usr/bin/env bash
  while ! ls /dev/nvme1n1 &> /dev/null
  do
    sleep 5
  done
  if ! blkid -o value -s TYPE /dev/nvme1n1 &> /dev/null
  then
    mkfs.xfs /dev/nvme1n1
  fi
  mkdir -p /mnt/volume
  mount /dev/nvme1n1 /mnt/volume
  EOT
}

resource "aws_key_pair" "challenge" {
  key_name   = "challenge-${random_pet.unique.id}"
  public_key = file("${path.module}/public_key")
}

output "public_ip" {
  value = module.challenge.instance_ip
}

output "instance_id" {
  value = module.challenge.instance_id
}
