# # Stage 1: Install dependencies
# FROM node:22-alpine AS dependencies
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm ci --only=production

# # Stage 2: Build the application
# FROM node:22-alpine AS builder
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 3: Production image
# FROM node:22-alpine AS production
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# WORKDIR /usr/src/app

# COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/dist ./dist
# COPY package.json ./
# COPY --from=builder /usr/src/app/data-source.js ./data-source.js
# COPY --from=builder /usr/src/app/src/infrastructure/database/migrations ./dist/infrastructure/database/migrations

# EXPOSE 3000
# CMD ["node", "dist/main"]

FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

RUN npm install -g ts-node-dev

COPY . .

ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

CMD ["ts-node-dev", "--respawn", "--transpile-only", "src/main.ts"]
