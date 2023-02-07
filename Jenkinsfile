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
           withCredentials([sshUserPrivateKey(credentialsId: 'jenkins-ssh-private', keyFileVariable: '', passphraseVariable: 'user', usernameVariable: 'pass')]) {
               sh("""
                   #!/usr/bin/env bash
									 echo pwd
                   cd /home/kevin/LABs/project-test01
	            	   git config --global user.email "aji7day@gmail.com"
                   git checkout master		 
                   cd env/dev && kustomize edit set image kkimmin/git-test:${BUILD_NUMBER}
                   git commit -a -m "updated the image tag"
                   git push
               """)
           }
       }
   }
