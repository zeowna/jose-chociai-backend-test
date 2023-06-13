FROM node:18-alpine

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn
COPY . .

CMD ["yarn", "start"]
