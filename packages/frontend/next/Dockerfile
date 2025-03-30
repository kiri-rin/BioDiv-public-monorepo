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
RUN mkdir -p /app/packages/next
RUN mkdir -p /app/packages/common
RUN mkdir -p /app/patches
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY .yarn ./.yarn
COPY package*.json /app
COPY yarn.lock /app
COPY .yarnrc.yml /app
COPY ./packages/next/package*.json /app/packages/next
COPY ./packages/common/package*.json /app/packages/common
RUN yarn install;


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.yarn ./.yarn
COPY --from=deps /app/packages/next/node_modules ./packages/next/node_modules


COPY .yarn ./.yarn
COPY package*.json /app
COPY yarn.lock /app
COPY .yarnrc.yml /app
COPY ./packages/next /app/packages/next
COPY ./packages/common /app/packages/common

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app/packages/next
RUN yarn run build;

# Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/packages/next/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/packages/next/.next/standalone/packages/next ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/next/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
