output "public_ip" {
  value = aws_instance.app_server.public_ip
}

output "ssh_command" {
  value = "ssh -i ~/.ssh/democentralcanada.pem ubuntu@${aws_instance.app_server.public_ip}"
}


