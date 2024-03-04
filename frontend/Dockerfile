FROM node:20-alpine AS build-image

WORKDIR /app/client

COPY package.json ./
RUN NODE_ENV=developement npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS production-image
WORKDIR /app/client

COPY --from=build-image /app/client/dist/ /app/client/dist/

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript

EXPOSE 5000

CMD ["npm", "run", "preview" ]