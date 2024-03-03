FROM node:20-alpine AS server-build-image

WORKDIR /app/server

COPY package.json .
COPY tsconfig.json .
RUN NODE_ENV=developement npm install

ENV NODE_ENV=production

COPY src/ ./src/
RUN npm run build

ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/server.js" ]