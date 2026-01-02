FROM node:21-alpine as build

WORKDIR /app
COPY . /app

ARG REACT_APP_GITHUB_PAT

RUN yarn install && \
    yarn build

FROM nginx:alpine

LABEL description "Maxep Personal Page"
LABEL org.opencontainers.image.source https://github.com/maxep/maxep.me

COPY --from=build /app/build /usr/share/nginx/html