node {
    stage('Clone repository') {
        checkout scm
    }
    stage('Build image') {
        app = docker.build("kkimmin/git-test:$BUILD_NUMBER")
    }
     stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-cred') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
     stage('Deploy'){
           checkout([$class: 'GitSCM',
                   branches: [[name: '*/master' ]],
                   extensions: scm.extensions,
                   userRemoteConfigs: [[
                       url: 'https://github.com/MinAKwhynot/jenkins-argo.git',
                       credentialsId: 'jenkins-ssh-private',
                   ]]
           ])
           sshagent(credentials: ['jenkins-ssh-private']){
               sh("""
                   #!/usr/bin/env bash
                   set +x
                   export GIT_SSH_COMMAND="ssh -oStrictHostKeyChecking=no
		   git config --global user.email "aji7day@gmail.com"
                   git checkout master
                   cd env/dev && kustomize edit set image kkimmin/git-test:${BUILD_NUMBER}
                   git commit -a -m "updated the image tag"
                   git push
               """)
           }
       }
   }

