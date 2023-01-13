FROM node:14-alpine

WORKDIR /usr/src/app

COPY ./server/dist ./server/dist
COPY ./server/src ./server/src
COPY ./server/node_modules ./server/node_modules
COPY ./client/build ./client/build

WORKDIR /usr/src/app/server

CMD ["node",  "dist/main.js"]