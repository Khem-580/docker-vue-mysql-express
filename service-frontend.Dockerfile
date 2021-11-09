FROM node:12.16.3 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build
RUN npm install serve -g
CMD ["serve", "-s", "dist"]
