FROM node:20.11.1-alpine3.19
# RUN addgroup desoc && adduser -S -G desoc desoc
# USER desoc
WORKDIR /app/
# COPY --chown=desoc package*.json .
COPY package*.json .
RUN npm install
# COPY --chown=desoc . .
COPY . .
EXPOSE 4200
CMD [ "npm", "start" ]

