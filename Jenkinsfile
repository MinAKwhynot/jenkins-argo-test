podTemplate(label: 'docker-build', 
  containers: [
    containerTemplate(
      name: 'git',
      image: 'alpine/git',
      command: 'cat',
      ttyEnabled: true
    ),
    containerTemplate(
      name: 'docker',
      image: 'docker',
      command: 'cat',
      ttyEnabled: true
    ),
  ],
  volumes: [ 
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'), 
  ]
) {
    node('docker-build') {
        def dockerHubCred = "dockerhub-cred"
        def appImage
        
        stage('Checkout'){
            container('git'){
                checkout scm
            }
        }
        
        stage('Build'){
            container('docker'){
                script {
                    appImage = docker.build("kkimmin/git-test:$BUILD_NUMBER")
                }
            }
        }
        
        stage('Test'){
            container('docker'){
                script {
                    appImage.inside {
                        //sh 'npm install'
                        //sh 'npm test'
                    }
                }
            }
        }

        stage('Push'){
            container('docker'){
                script {
                    docker.withRegistry('https://registry.hub.docker.com', dockerHubCred){
                        appImage.push("${env.BUILD_NUMBER}")
                        appImage.push("latest")
                    }
                }
            }
        }

        stage('Deploy'){
            container('argo'){
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
                        git config --global user.email "cure4itches@gmail.com"
                        git checkout main
                        cd env/dev && kustomize edit set image arm7tdmi/node-hello-world:${BUILD_NUMBER}
                        git commit -a -m "updated the image tag"
                        git push
                    """)
                }
            }
        }
    } 
}
