FROM node:12.16.3
WORKDIR /app
COPY package*.json ./
RUN npm install --only=prod
COPY ./ .
EXPOSE 9400
CMD ["node", "index.js"]
