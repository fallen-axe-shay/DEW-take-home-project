# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN DEBUG=babel npm run build --prod --optimization=false

# stage 2
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY  --from=node /app/nginx/*  /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/dew-app /usr/share/nginx/html