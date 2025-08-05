variable "aws_region" {
  default = "ca-central-1"
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

variable "public_key_path" {
  description = "Path to the public SSH key"
  type        = string
}
