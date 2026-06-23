# Build Tailwind CSS and produce static site files
FROM node:20-alpine AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY tailwind.config.js ./
COPY src ./src
COPY *.html ./
COPY imgs ./imgs
COPY js ./js
COPY scripts ./scripts
RUN pnpm run build

FROM nginx:1.27-alpine

COPY --from=build /app /usr/share/nginx/html

RUN sed -i 's/index  index.html index.htm;/index  login.html;/' /etc/nginx/conf.d/default.conf && \
    rm -f /usr/share/nginx/html/package.json \
    /usr/share/nginx/html/pnpm-lock.yaml \
    /usr/share/nginx/html/tailwind.config.js && \
    rm -rf /usr/share/nginx/html/src /usr/share/nginx/html/scripts /usr/share/nginx/html/node_modules

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
