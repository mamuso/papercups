FROM node:12.7-alpine

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh curl

WORKDIR /workspace

ARG GITHUB_TOKEN
RUN git config --global url."https://$GITHUB_TOKEN:@github.com/".insteadOf "https://github.com/"
RUN git config --global --add url."https://$GITHUB_TOKEN:@github.com/".insteadOf "ssh://git@github.com/"

COPY package.json .
COPY package-lock.json .
RUN npm install -g gh-pages
RUN npm install

COPY . .

RUN npm run stitchjson
RUN npm run build
RUN npm run export
RUN npm run deploy
