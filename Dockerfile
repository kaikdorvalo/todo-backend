ARG NODE_VERSION=18.17.0
ARG NODE_ENV=build
ARG APP_PORT=8080
ARG IMAGE_NAME=nestjs-starter

FROM node:${NODE_VERSION}-alpine as builder
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY . .

RUN yarn build
FROM node:${NODE_VERSION}-alpine
LABEL name=${IMAGE_NAME}

USER node
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE ${APP_PORT}
EXPOSE 3001
ENV PORT=3001
CMD ["node", "dist/main"]

HEALTHCHECK CMD curl --fail http://localhost:${APP_PORT}/v1/health/liveness || exit 1
