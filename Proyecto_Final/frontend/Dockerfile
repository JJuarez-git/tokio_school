FROM node:20.17-alpine3.19 as build
COPY . /app/
WORKDIR /app/
RUN npm install
RUN npm run build

FROM nginx:1.27.1-alpine3.20-slim
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html
EXPOSE 80
