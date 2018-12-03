pipeline {
  agent any
  stages {
    stage('Setup') {
      steps {
        sh '''whoami; 
 echo "Setting up environment..."; npm install;'''
      }
    }
    stage('Build') {
      steps {
        sh 'cd okta-hosted-login; echo "Building..."; ng build; '
      }
    }
  }
}