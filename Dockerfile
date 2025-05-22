FROM node:23-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage de production
FROM node:23-slim

WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis le stage de build
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

EXPOSE 4000
ENV PORT=4000

CMD ["node", "./.output/server/index.mjs"]