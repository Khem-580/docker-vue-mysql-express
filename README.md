Frontend docker
    docker build -t image-vue-app -f ./service-frontend.Dockerfile ./src/frontend/
    docker run -p 9200:3000 -d --name container-vue-app image-vue-app

Backend docker
    docker build -t image-express-app -f ./service-backend.Dockerfile ./src/backend/
