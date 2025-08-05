variable "aws_region" {
  default = "us-east-1"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "key_name" {
  description = "EC2-key name"
  type        = string
}

variable "public_key" {
  description = "SSH public key content"
  type        = string
}

variable "ami_id" {
  description = "AMI ID for EC2"
  type        = string
}

variable "public_key_path" {
  description = "Path to the public SSH key"
  type        = string
}

