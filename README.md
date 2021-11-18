Backend docker
    docker build -t image-express-app -f ./service-backend.Dockerfile ./src/backend/

Development installation
1. Add  "127.0.0.1 local-frontend" 
        "127.0.0.1 local-backend" in host file
2. "npm run build" inside src/frontend directory
3. "docker-compose up -d" in command line
4. Open "local-frontend" from your broswer

If you found this problem when restart docker-compose on Windows
"mysqld: Cannot change permissions of the file 'ca.pem' (OS errno 1 - Operation not permitted)"

then run this command
"chmod -R 777 ./backup/db"