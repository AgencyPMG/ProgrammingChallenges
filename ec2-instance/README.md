# Provision an EC2 instance with terraform

Write a terraform module representing an EC2 instance with an EBS volume
and elastic IP address attached.

In this directory, you will find a VPC and security group set up to allow SSH.
You will need to copy your public key into this directory and rename it to
`public_key`.  In `instance.tf` you will find a module block called `challenge`, 
note the variables and outputs and implement the module code in the `instance`
subdirectory.

When we receive your solution, we will init, plan, and apply it to our AWS
environment in order to evaluate that it completes without error and implements
the requirements completely.

## Acceptance Criteria

- Your solution is expected to init, plan, and apply cleanly without any
  errors.
- The VPC and security group community modules are used in `vpc.tf` and will 
  be included during `terraform init`.  They should not be reimplemented.
- Your solution should output the public IP and instance ID after applying.
- When reviewing your solution, we should be able to ssh in to the instance at
  using the attached elastic IP and get in using a public key we provide.
- After gaining access to the instance we should find a 100GB volume formatted
  as XFS and mounted at `/mnt/volume`.

## How do I submit my answer?

Send an email to tech@pmg.com or reach out to the person who gave you the
challenge. Feel free to send an archive (a tar or zipball are fine) or link us
to a public pastebin (github gist, etc) or repository (bitbucket, github, etc).
