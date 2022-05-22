FROM node:16

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "./node_modules/.bin/nodemon", "dist/server.js" ]
