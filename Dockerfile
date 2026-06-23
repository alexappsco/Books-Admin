# Build Tailwind CSS and produce static site files
FROM node:20-alpine AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY tailwind.config.js ./
COPY src ./src
COPY *.html ./
COPY imgs ./imgs
COPY js ./js
COPY scripts ./scripts
RUN pnpm run build

# Static files only — configure Nginx on the host to serve /site (or copy via volume)
FROM alpine:3.20

WORKDIR /site

COPY --from=build /app /site

RUN rm -f package.json pnpm-lock.yaml tailwind.config.js && \
    rm -rf src scripts node_modules
