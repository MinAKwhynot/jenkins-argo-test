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
    stage('Git Push'){
    steps{
        script{
            GIT_CREDS = credentials(<git creds id>)
            sh '''
                git add .
                git commit -m "push to git"
                git push https://${GIT_CREDS_USR}:${GIT_CREDS_PSW}@bitbucket.org/jenkins-argo.git master
            '''
        }
    }
}
