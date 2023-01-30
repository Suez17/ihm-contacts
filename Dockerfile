FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

ARG DEPLOYMENT_TYPE

RUN npm ci && npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/* /usr/share/nginx/html/
