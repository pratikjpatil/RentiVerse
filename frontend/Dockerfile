# Stage 1: Build stage
FROM node:18-alpine AS build-stage

# Set build-time environment variables
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_RAZORPAY_KEY_ID

WORKDIR /rentiverse-ui

COPY package.json .
RUN npm install

COPY . .

# Set environment variables for the build
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV REACT_APP_RAZORPAY_KEY_ID=$REACT_APP_RAZORPAY_KEY_ID

RUN npm run build

# Stage 2: Production stage
FROM nginx:1.25-alpine

# Copy built assets from the build stage
COPY --from=build-stage /rentiverse-ui/build /usr/share/nginx/html

EXPOSE 80

CMD nginx -g 'daemon off;'