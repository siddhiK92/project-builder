pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: sonar-scanner
    image: sonarsource/sonar-scanner-cli
    command:
    - cat
    tty: true
  - name: kubectl
    image: bitnami/kubectl:latest
    command:
    - cat
    tty: true
    securityContext:
      runAsUser: 0
      readOnlyRootFilesystem: false
    env:
    - name: KUBECONFIG
      value: /kube/config        
    volumeMounts:
    - name: kubeconfig-secret
      mountPath: /kube/config
      subPath: kubeconfig
  - name: dind
    image: docker:dind
    securityContext:
      privileged: true  # Needed to run Docker daemon
    env:
    - name: DOCKER_TLS_CERTDIR
      value: ""  # Disable TLS for simplicity
    volumeMounts:
    - name: docker-config
      mountPath: /etc/docker/daemon.json
      subPath: daemon.json  # Mount the file directly here
  volumes:
  - name: docker-config
    configMap:
      name: docker-daemon-config
  - name: kubeconfig-secret
    secret:
      secretName: kubeconfig-secret
'''
        }
    }
    


    environment {
        // TODO: put actual Supabase credentials for docs-viewer
             VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2aGxtc3h0ZXZ4emxjbHJjY3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NTIxNjYsImV4cCI6MjA4MTUyODE2Nn0.Fv388mhNPPaf_f5YYI8DSQJUGyGVxlMjqrTrB_Rfdn4"
             VITE_SUPABASE_URL="https://hvhlmsxtevxzlclrccre.supabase.co"

    stages {

        stage('Build Docker Image') {
            steps {
                container('dind') {
                    sh '''
                        sleep 15
                        docker build \
                          --build-arg VITE_SUPABASE_URL='${VITE_SUPABASE_URL}' \
                          --build-arg VITE_SUPABASE_ANON_KEY='${VITE_SUPABASE_ANON_KEY}' \
                          -t docs-viewer:latest .
                    '''
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                container('sonar-scanner') {
                    withCredentials([string(credentialsId: 'sonar-token-2401093', variable: 'SONAR_TOKEN')]) {
                        sh '''
                            sonar-scanner \
                              -Dsonar.projectKey=2401093_siddhiKawade_LMS  \
                              -Dsonar.host.url=http://my-sonarqube-sonarqube.sonarqube.svc.cluster.local:9000 \
                              -Dsonar.token=$SONAR_TOKEN \
                              -Dsonar.sources=src \
                              -Dsonar.exclusions=node_modules/**,dist/**
                        '''
                    }
                }
            }
        }

        stage('Login to Docker Registry') {
            steps {
                container('dind') {
                    sh '''
                        docker --version
                        sleep 10
                        docker login nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085 -u admin -p Changeme@2025
                    '''
                }
            }
        }

        stage('Build - Tag - Push') {
            steps {
                container('dind') {
                    sh '''
                        docker tag docs-viewer:latest \
                          nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/2401093-project/docs-viewer:latest

                        docker push \
                          nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/2401093-project/docs-viewer:latest

                        docker pull \
                          nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/2401093-project/docs-viewer:latest

                        docker image ls
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                container('kubectl') {
                    dir('k8s-deployment') {
                        sh '''
                            kubectl apply -f docs-viewer-k8s.yaml -n 2401093
                        '''
                    }
                }
            }
        }
    }
}