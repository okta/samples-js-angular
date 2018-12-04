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
echo "Building..."; ng build --env=prod; 
mv dist ../docker/landing-page;
cd ../server;
cp * ../docker/okta-server;  
cd ../docker/okta-server; 
npm install; '''
      }
    }
    stage('Deploy') {
      steps {
        sh 'echo "Deploying..."; cd docker; sudo docker-compose build; sudo nohup docker-compose up &'
      }
    }
  }
}