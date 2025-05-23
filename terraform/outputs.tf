output "public_ip" {
  value = aws_instance.nodejs_app.public_ip
}

output "ssh_command" {
  value = "ssh -i ~/.ssh/${aws_key_pair.deployer.key_name}.pem ubuntu@${aws_instance.nodejs_app.public_ip}"
}

