
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
    dir('backend') {
      bat 'docker build -t healthcare-backend .'
    }
  }
}


    stage('Push to DockerHub') {
  steps {
    script {
      bat 'docker login -u yourdockerhubusername -p yourdockerhubpassword'
      bat 'docker tag healthcare-backend yourdockerhubusername/healthcare-backend:latest'
      bat 'docker push yourdockerhubusername/healthcare-backend:latest'
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
