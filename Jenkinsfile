pipeline {
    agent any

    tools {
      nodejs 'NodeJS24' // Name wie definiert in Jenkins Tool Settings
    }

    environment {
      CI = 'true'
    }

    stages {
        stage('Checkout') {
          steps {
            git branch: 'main', url: 'https://github.com/NXKED/DLBSEPDOCD01_D.git'
          }
        }

        stage('Install') {
          steps {
            sh 'npm install'
          }
        }

        stage('Lint') {
          steps {
            sh 'npx eslint . --fix' || true // --fix Code direkt aendern rm true 
          }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npx vitest run --reporter --outputFile=test-results.xlm' // Ergebnisse der Tests in Jenkins anzeigen lassen 
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t dlbsep:staging .'
            }
        }

        stage('Deploy to Production') {
          steps {
            input message: 'Soll in Produktion deployt werden?'
            sh 'docker tag dlbsep:staging dlbsep:latest' // rename des Docker builds anstatt neu zu bauen. 
            sh 'docker run -d --rm --name dlbsep-prod -p 80:3000 dlbsep:latest'
          }
        }
    }

    /**
      post {
        always {
          mail(
            to: 'nik.breiter@iu-study.org', // Nachricht always an Email ueber Status des Builds. Alternativ mit 'failure'. Wechsel zu Slack tbd.
            subject: "Build ${currentBuild.fullDisplayName}",
            body: "Status: ${currentBuild.currentResult}"
          )
          junit 'test-results.xml'
        }
      }
    */
}