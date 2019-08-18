FROM node:12.7-alpine

ENV GITHUB_TOKEN ${GITHUB_TOKEN}

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh curl

WORKDIR /workspace

COPY package.json .
COPY package-lock.json .
RUN npm install -g gh-pages
RUN npm install

COPY . .

RUN npm run stitchjson
RUN npm run build
RUN npm run export
RUN npm run deploy
