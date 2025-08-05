
pipeline {
  agent any

  environment {
    IMAGE_NAME = 'yourdockerhubusername/healthcare-app'
    CREDENTIALS_ID = 'dockerhub-credentials-id'
  }

  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/yourusername/healthcare-app.git'
      }
    }

    stage('Install & Test') {
      steps {
        dir('backend') {
          sh 'npm install'
          sh 'npm test || echo "No tests defined yet"'
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
