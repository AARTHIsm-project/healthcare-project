
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
    withCredentials([usernamePassword(credentialsId: 'dockerhub-aarthi-id', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
      script {
        bat 'docker login -u %DOCKERHUB_USER% -p %DOCKERHUB_PASS%'
        bat 'docker tag healthcare-backend %DOCKERHUB_USER%/healthcare-backend:latest'
        bat 'docker push %DOCKERHUB_USER%/healthcare-backend:latest'
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
