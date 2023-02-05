pipeline {
    agent any
    stages {
        stage('Checkout'){
              checkout scm
                  echo 'checkout'
            }
        }

        stage('Build'){
              script {
                  appImage = docker.build("kkimmin/git-test:$BUILD_NUMBER")
                  echo 'build!!'
                  sh 'sleep 5'
            }
        }

        stage('Test'){
              script {
                  appImage.inside {
                      //sh 'npm install'
                      //sh 'npm test'
                  echo 'test!!'
                  sh 'sleep 5'
            }
        }

        stage('Push'){
              script {
                  docker.withRegistry('https://registry.hub.docker.com', dockerHubCred){
                      appImage.push("${env.BUILD_NUMBER}")
                      appImage.push("latest")
                      echo 'push!!'
                      sh 'sleep 5'
            }
        }

        stage('Deploy'){
              checkout([$class: 'GitSCM',
                      branches: [[name: '*/main' ]],
                      extensions: scm.extensions,
                      userRemoteConfigs: [[
                          url: 'git@github.com:cure4itches/docker-hello-world-deployment.git',
                          credentialsId: 'jenkins-ssh-private',
                      ]]
              ])
              sshagent(credentials: ['jenkins-ssh-private']){
                  sh("""
                      #!/usr/bin/env bash
                      set +x
                      export GIT_SSH_COMMAND="ssh -oStrictHostKeyChecking=no"
                      git config --global user.email "aji7day@gmail.com"
                      git checkout main
                      cd env/dev && kustomize edit set image kkimmin/git-test:${BUILD_NUMBER}
                      git commit -a -m "updated the image tag"
                      git push
                  """)
            }
        }
    }
}

