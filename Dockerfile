FROM node:22-slim as builder

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27.5-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./deploy/nginx.conf /etc/nginx/nginx.conf

WORKDIR /app

COPY ./deploy/start.sh .
COPY --from=builder /app/dist/index.html .

EXPOSE 80

ENTRYPOINT ["sh", "./app/start.sh"]
