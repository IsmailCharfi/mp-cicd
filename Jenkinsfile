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

        stage ("Build docker image") {
            steps {
                script {
                    docker.build(REPOSITORY_NAME, "-f Dockerfile .")
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
    }
}