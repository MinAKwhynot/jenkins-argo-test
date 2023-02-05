 node {
     stage('Clone repository') {
         checkout scm
     }

     stage('Build image') {
         app = docker.build("kkimmin/git-test:$BUILD_NUMBER")
     }
}
