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
        sh '''cd okta-hosted-login; 
echo "Building..."; ng build; 
mv dist ../docker/landing-page; 
mv package.json ../docker/okta-server; 
mv package-lock.json ../docker/okta-server; 
mv server.js ../docker/okta-server; mv post-install.js ../docker/okta-server; cd ../docker/okta-server; npm install; '''
      }
    }
    stage('Deploy') {
      steps {
        sh 'echo "Deploying..."; cd Docker; sudo docker-compose build; nohup sudo docker-compose up &'
      }
    }
  }
}