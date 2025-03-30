# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM node:18-alpine AS base

# update dependencies, add libc6-compat and dumb-init to the base image
# install and use yarn 4.x
RUN corepack enable && corepack prepare yarn@4.2.2

# Install dependencies only when needed
FROM base AS deps
RUN yarn set version berry

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

RUN mkdir -p /app
RUN mkdir -p /app/packages
RUN mkdir -p /app/packages/web
RUN mkdir -p /app/packages/common
RUN mkdir -p /app/packages/rrrcn-services
RUN mkdir -p /app/patches
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY .yarn ./.yarn
COPY package*.json /app
COPY yarn.lock /app
COPY .yarnrc.yml /app
COPY ./packages/web/package*.json /app/packages/web
COPY ./packages/rrrcn-services/package*.json /app/packages/rrrcn-services
COPY ./packages/common/package*.json /app/packages/common
RUN yarn install;


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.yarn ./.yarn
COPY --from=deps /app/packages/web/node_modules ./packages/web/node_modules
#COPY --from=deps /app/packages/rrrcn-services/node_modules ./packages/rrrcn-services/node_modules


COPY .yarn ./.yarn
COPY package*.json /app
COPY yarn.lock /app
COPY .yarnrc.yml /app
COPY ./packages/web /app/packages/web
COPY ./packages/common /app/packages/common
COPY ./packages/rrrcn-services /app/packages/rrrcn-services

RUN yarn run build-web;

FROM nginx:stable-alpine as runner
COPY --from=builder /app/packages/web/build /usr/share/nginx/html
COPY ./packages/web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
