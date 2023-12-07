pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS_ID = "dockerhub"
        REPOSITORY_NAME = "ismailcharfi/mp-cicd:latest"
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Testing And sending reports by mail') {
            steps {
                script {
                    sh 'docker-compose up -d'
                    sh 'docker exec mp-app npm test'
                }
            }
        }

        stage ("Build docker image") {
            steps {
                script {
                    docker.build(REPOSITORY_NAME, "-f Dockerfile.prod .")
                }
            }
        }

        stage ("Push image to dockerhub") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', DOCKERHUB_CREDENTIALS_ID) {
                        docker.image(REPOSITORY_NAME).push()
                    }
                }
            }
        }

        stage ("Deploy to EKS") {
            steps {
                script {
                    sh 'kubectl delete deployment --all'
                    sh 'kubectl apply -f ./deployments/deployment.yaml'

                }
            }
        }
    }
}