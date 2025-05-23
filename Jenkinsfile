pipeline {
    agent any

    environment {
        // Set after 'terraform apply', e.g. via Jenkins parameter or secrets
        EC2_IP  = credentials('ec2-ip')        // simple string cred
        SSH_KEY = credentials('deployer-key')  // SSH private key
    }

    stages {
        stage('Checkout') {
            steps { git url: 'https://github.com/SuchithraChandrasekaran/nodejs_service_deployment.git' }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    sh '''
                      terraform init
                      terraform apply -auto-approve \
                        -var key_name=deployer-key \
                        -var public_key_path=$HOME/.ssh/deployer-key.pub
                    '''
                    script {
                        env.EC2_IP = sh(
                            script: "terraform output -raw public_ip",
                            returnStdout: true
                        ).trim()
                    }
                }
            }
        }

        stage('Ansible Deploy') {
            steps {
                writeFile file: 'ansible/inventory', text: "${env.EC2_IP}\n"
                sh '''
                  ansible-playbook \
                    -i ansible/inventory \
                    ansible/node_service.yml \
                    --private-key "$SSH_KEY" \
                    --user ubuntu
                '''
            }
        }
    }
}

