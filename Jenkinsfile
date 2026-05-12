pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        PORT = '3000'
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Code checked out successfully.'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
                echo 'Dependencies installed.'
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo 'Running unit tests...'
                bat 'npm run test:unit'
                echo 'Unit tests completed.'
            }
        }

        stage('Start Server') {
            steps {
                echo 'Starting the app for integration tests...'
                bat 'cmd /c start /B "" npm start'
                bat 'powershell -Command "Start-Sleep -Seconds 5"'
            }
        }

        stage('Run Integration Tests') {
            steps {
                echo 'Running integration tests...'
                bat 'npm run test:integration'
                echo 'Integration tests completed.'
            }
        }

        stage('Generate Reports') {
            steps {
                echo 'Generating test reports...'
                bat 'npm run test:report'
                echo 'Reports generated.'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'mochawesome-report/**/*', allowEmptyArchive: true
            echo 'Artifacts archived.'
        }

        success {
            echo 'Pipeline succeeded.'
        }

        failure {
            echo 'Pipeline failed. Check the console output for details.'
        }
    }
}
