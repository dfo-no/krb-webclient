FROM node:lts-alpine as build

ARG env
ARG node_env=development

ENV NODE_ENV $node_env

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN rm -rf node_modules && \
  yarn install --frozen-lockfile

COPY . .
RUN yarn build:$env

FROM nginx:alpine

COPY --from=build /usr/src/app/build/. /usr/share/nginx/html
COPY app-nginx.conf /etc/nginx/conf.d/default.conf
