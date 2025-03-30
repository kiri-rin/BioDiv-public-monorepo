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
RUN mkdir -p /app/packages/frontend/web
RUN mkdir -p /app/packages/frontend/helpers
RUN mkdir -p /app/packages/common-types
RUN mkdir -p /app/packages/common-helpers
RUN mkdir -p /app/patches
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY .yarn ./.yarn
COPY package*.json /app
COPY yarn.lock /app
COPY .yarnrc.yml /app
COPY ./packages/frontend/web/package*.json /app/packages/frontend/web
COPY ./packages/frontend/helpers/package*.json /app/packages/frontend/helpers
COPY ./packages/common-types/package*.json /app/packages/common-types
COPY ./packages/common-helpers/package*.json /app/packages/common-helpers
RUN yarn install;


# Rebuild the source code only when needed
FROM base AS builder
ARG REACT_APP_BASE_PATH
ARG REACT_APP_GOOGLE_KEY
ENV REACT_APP_BASE_PATH=${REACT_APP_BASE_PATH}
ENV REACT_APP_GOOGLE_KEY=${REACT_APP_GOOGLE_KEY}
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.yarn ./.yarn
COPY --from=deps /app/packages/frontend/web/node_modules ./packages/frontend/web/node_modules
#COPY --from=deps /app/packages/frontend/helpers/node_modules ./packages/frontend/helpers/node_modules
#COPY --from=deps /app/packages/common-types/node_modules ./packages/common-types/node_modules
#COPY --from=deps /app/packages/common-helpers/node_modules ./packages/common-helpers/node_modules


COPY .yarn ./.yarn
COPY package*.json /app
COPY yarn.lock /app
COPY .yarnrc.yml /app
COPY ./packages/frontend/web /app/packages/frontend/web
COPY ./packages/frontend/helpers /app/packages/frontend/helpers
COPY ./packages/common-helpers /app/packages/common-helpers
COPY ./packages/common-types /app/packages/common-types

RUN yarn run build-web;

FROM nginx:stable-alpine as runner
COPY --from=builder /app/packages/frontend/web/build /usr/share/nginx/html
COPY ./packages/frontend/web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
