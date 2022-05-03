def gv

pipeline {
  agent any
  
  environment {
    TEAM_NOTIFICATION_WEBHOOK_URL = 'https://outlook.office.com/webhook/267d4182-80da-4564-8120-b7584073beb6@1e0c92b0-f1bd-441e-bbe6-c778f9ced553/JenkinsCI/a28514835553451bbbffd8f0ac246a2c/e9007249-fedf-48f7-bec5-f368e626f9ec'
  }

  stages {
    stage('Build') {
      steps {
        script {
          gv = load "script.groovy"
          gv.buildTeamNotification('Started','#177fcf')
          gv.runPackage()
        }
      }
    }

    stage('S3Copy') {
      steps {
        script {
          gv.runS3Copy()
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          gv.runDeploy()
        }
      }
    }       
  }

  post {
    always {
      script {
        gv.runCleanUP()
      }
    }
    success {
      script {
        gv.buildTeamNotification('Success','#8cc04d')
      }
    }
    unstable {
      script {
        gv.buildTeamNotification('Unstable','#f4b548')
      }
    }
    failure {
      script {
        gv.buildTeamNotification('Failure','#d74b54')
      }
    }
    aborted {
      script {
        gv.buildTeamNotification('Aborted','#949494')
      }
    }
  }
}