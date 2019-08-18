FROM node:10.15-jessie

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh curl

WORKDIR /workspace

COPY package.json .
COPY package-lock.json .
RUN npm install -g gh-pages
RUN npm install

COPY . .

RUN npm stitchjson
RUN npm build
RUN npm export
RUN npm deploy
