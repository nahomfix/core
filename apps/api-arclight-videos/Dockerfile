FROM node:16-alpine

EXPOSE 4007

ENV PRISMA_LOCATION=/app/node_modules/.prisma/api-arclight-videos-client

RUN apk upgrade --update-cache --available && \
    apk add openssl1.1-compat && \
    rm -rf /var/cache/apk/*

WORKDIR /app
COPY ./dist/apps/api-arclight-videos .

# dependencies that nestjs needs
RUN npm install --production --silent

WORKDIR /prisma
COPY ./apps/api-arclight-videos/db .
RUN npm install --silent prisma@^3.15.2
RUN npx prisma@^3.15.2 generate

WORKDIR /app
RUN npm install tslib apollo-server-express @nestjs/mapped-types @prisma/client@^3.15.2 pino-pretty@9.1.1

CMD npx prisma@^3.15.2 migrate deploy --schema /prisma/schema.prisma; node ./main.js