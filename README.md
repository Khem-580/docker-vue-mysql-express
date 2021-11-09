Frontend docker build command
    docker build -t image-vue-app -f ./service-frontend.Dockerfile ./src/frontend/

Frontend docker run command
    docker run -p 9200:3000 -d --name container-vue-app image-vue-apps