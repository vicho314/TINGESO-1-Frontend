pipeline {
    agent any
    tools{
        nodejs 'node'
    }
    stages{
        stage('Build maven'){
            steps{
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/vicho314/TINGESO-1-Frontend']])
                sh 'npm run build'
            }
        }
/*
        stage('Unit Tests') {
            steps {
                // Run Maven 'test' phase. It compiles the test sources and runs the unit tests
                sh 'mvn test' // Use 'bat' for Windows agents or 'sh' for Unix/Linux agents
            }
        }
*/
        stage('Build docker image'){
            steps{
                script{
                    sh 'docker build -t vicho314/kartingrm-frontend:latest .'
                }
            }
        }
        stage('Push image to Docker Hub'){
            steps{
                script{
                   withCredentials([usernamePassword(credentialsId: 'passwid', passwordVariable: 'passw')]) {
                        sh 'docker login -u vicho314 -p $passw'
                   }
                   sh 'docker push vicho314/kartingrm-frontend:latest'
                }
            }
        }
    }
}
