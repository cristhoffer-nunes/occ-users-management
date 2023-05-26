FROM node:latest

WORKDIR /users-management

COPY package*.json ./

RUN yarn 

COPY . . 

EXPOSE 3000

CMD yarn dev

