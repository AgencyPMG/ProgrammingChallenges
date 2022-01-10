# Provision an EC2 instance with terraform

Write a terraform module representing an EC2 instance with an EBS volume
and elastic IP address attached.

In this directory, you will find a VPC and security group set up to allow SSH.
You will need to copy your public key into this directory and rename it to
`public_key`.  In `instance.tf` you will find a module block called `challenge`, 
note the variables and outputs and implement the module code in the `instance`
subdirectory.
