pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS_ID = "dockerhub"
        REPOSITORY_NAME = "ismailcharfi/mp-cicd:latest"
        TEST_DATABASE_CONTAINER = "mongodb-test"
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
                    docker.image('mongo:latest').run('-p 27017:27017 --name %TEST_DATABASE_CONTAINER% -d')
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
                sh 'docker stop your-container-name || true'
                sh 'docker rm your-container-name || true'
            }
        }
    }
}