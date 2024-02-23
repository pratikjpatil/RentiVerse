FROM node:18-alpine
WORKDIR /rentiverse-api
COPY package*.json ./
RUN npm install     
COPY . .
EXPOSE 4500
ENTRYPOINT ["node", "server.js"]
