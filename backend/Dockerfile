FROM node:20-alpine AS server-build-image

WORKDIR /app/server/build

COPY package.json .
COPY tsconfig.json .
RUN NODE_ENV=developement npm install

ENV NODE_ENV=production

COPY src/ ./src/
RUN npm run build

FROM node:20-alpine AS production-build-image

WORKDIR /app/server

COPY --from=server-build-image /app/server/build/dist/ /src/

COPY package.json .
COPY tsconfig.json .
RUN NODE_ENV=developement npm install

ENV NODE_ENV=production

ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/server.js" ]