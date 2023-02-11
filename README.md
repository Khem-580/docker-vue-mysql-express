Coupon-management system for code interview in the cement company

## Installation
Make sure you have these tools on your PC
- Nodejs version 12 or higher (LTS version)
- Docker

#### 

1. Serve nodejs app in src/backend directory
```sh
cd ./src/backend
npm install
node index
```

2. Serve web app in src/frontend directory
```sh
cd ./src/frontend
npm install
cp .env.sample .env
npm run serve
```

3. At root of this project run
```sh
docker-compose up -d --build
```
For build & start database service

4. Enjoy "http://localhost:8080" on your browser
---
