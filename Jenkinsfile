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

        stage('Testing') {
            steps {
                script {
                    docker.image('mongo:latest').run('-p 27017:27017 --name mongodb-test -d')
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage ("Build docker image") {
            steps {
                script {
                    docker.build(REPOSITORY_NAME, ".")
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

    post {
        always {
            script {
                sh 'docker stop mongodb-test || true'
                sh 'docker rm mongodb-test || true'
            }
        }
    }
}