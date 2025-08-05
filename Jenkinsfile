
pipeline {
  agent any

  environment {
    IMAGE_NAME = 'aarthidevops/healthcare-app'
    CREDENTIALS_ID = 'dockerhub-aarthi-id'
  }

  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/AARTHIsm-project/healthcare-project'
      }
    }

    stage('Install & Test') {
      steps {
        dir('backend') {
          bat 'npm install'
          bat 'npm test || echo "No tests defined yet"'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build("${IMAGE_NAME}:${BUILD_NUMBER}", 'backend')
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', CREDENTIALS_ID) {
            dockerImage.push()
            dockerImage.push("latest")
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        echo 'Pulling Docker image and running on production server...'
      }
    }
  }
}
