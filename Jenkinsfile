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
}
