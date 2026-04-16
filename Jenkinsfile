pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        MONGO_URI = 'mongodb://127.0.0.1:27017/auth-app-test'
        PORT = '3000'
        CI = 'true'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
                echo 'Code checked out successfully'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
                echo 'Dependencies installed successfully'
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo 'Running unit tests...'
                bat 'npm run test:unit'
                echo 'Unit tests completed'
            }
        }

        stage('Run Integration Tests') {
            steps {
                echo 'Starting application for integration tests...'
                bat 'start /B npm start'
                echo 'Waiting for application to start...'
                bat 'timeout /t 5 /nobreak'
                
                echo 'Running integration tests...'
                bat 'npm run test:integration'
                echo 'Integration tests completed'
            }
        }

        stage('Generate Test Reports') {
            steps {
                echo 'Generating test reports...'
                bat 'npm run test:report'
                echo 'Test reports generated successfully'
            }
        }
    }

    post {
        always {
            echo 'Archiving test reports...'
            archiveArtifacts artifacts: 'mochawesome-report/**/*', allowEmptyArchive: true
            echo 'Test reports archived'
        }
        
        success {
            echo 'Pipeline completed successfully!'
        }
        
        failure {
            echo 'Pipeline failed! Please check the test results.'
        }
    }
}
