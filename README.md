Backend docker
    docker build -t image-express-app -f ./service-backend.Dockerfile ./src/backend/

Installation
1. Add  "127.0.0.1 local-frontend" 
        "127.0.0.1 local-backend" in host file
2. "npm run build" inside src/frontend directory
3. "docker-compose up -d" in command line
4. enjoy