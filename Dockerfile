FROM node:current-alpine3.16 AS builder

WORKDIR /app

COPY . .

ARG DEPLOYMENT_TYPE

RUN npm install && npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/* /usr/share/nginx/html/
