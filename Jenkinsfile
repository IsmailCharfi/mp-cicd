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
                    sh 'docker-compose up -d'
                    sh 'docker-compose exec app sh -c "npm test"'
                    sh 'docker-compose up -d'
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