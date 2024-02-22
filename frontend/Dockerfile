FROM node:18-alpine

WORKDIR /rentiverse-ui
COPY package.json .
RUN npm install
COPY . .

RUN npm run build

# Stage 2
FROM nginx:1.25-alpine

COPY --from=build-stage /rentiverse-ui/build /usr/share/nginx/html
EXPOSE 80

CMD nginx -g 'daemon off;'