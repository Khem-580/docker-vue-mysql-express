A Dockerization which combines many services for web development
such as mysql, phpmyadmin, nodejs and nginx

## Installation

1. Copy text below and place in your host file 
```
127.0.0.1 local-frontend
127.0.0.1 local-backend
```

2. Build web app in src/frontend directory
```sh
npm run build
```

3. At root of this project
```sh
docker-compose up -d
```

4. Test "http://local-frontend" on your broswer
