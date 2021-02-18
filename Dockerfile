FROM node:alpine as build

WORKDIR /app
COPY . /app

ARG REACT_APP_GITHUB_PAT

RUN yarn install && \
    yarn build

FROM nginx:alpine

LABEL description "Maxep Personal Page"
LABEL org.opencontainers.image.source https://github.com/maxep/maxep.github.io

COPY --from=build /app/build /usr/share/nginx/html