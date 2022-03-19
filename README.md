A Dockerization which combines a lot of services for web development
such as mysql, phpmyadmin, nodejs and nginx

## Installation
Make sure you have these tools on your PC
- Nodejs version 12 or higher (LTS version)
- Docker

#### There are 2 ways to set up this project

#### 1. Traditional way

1. Serve web app in src/frontend directory
```sh
cd ./src/frontend
npm install
npm run serve
```

2. At root of this project
```sh
docker-compose up -d --build
```

3. Enjoy "http://localhost:8080" on your browser
---
#### 2. Nginx way

1. Copy text below and place in your host file 
```
127.0.0.1 local-frontend
127.0.0.1 local-backend
```

2. Build web app in src/frontend directory
```sh
cd ./src/frontend
npm install
npm run build
```

3. At root of this project
```sh
docker-compose up -d --build
```

4. Test "http://local-frontend" on your browser
