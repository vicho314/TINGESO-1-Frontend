pipeline {
    agent any
    tools{
        nodejs 'nodejs'
    }
    stages{
    	stage('Npm install'){
    		steps{
    			sh 'npm install'
    		}
    	}
        stage('Build npm'){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/vicho314/TINGESO-1-Frontend']])
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
                withCredentials([usernamePassword(credentialsId: 'passwid', usernameVariable: 'USERDOCK', passwordVariable: 'PASSWDOCK')]) {
                        sh 'docker login -u $USERDOCK -p $PASSW'                 
                   }
                   sh 'docker push vicho314/kartingrm-frontend:latest'
                }
            }
        }
    }
}
