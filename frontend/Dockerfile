# ─── Stage 1: Install production deps only ───────
FROM node:20-alpine AS deps
WORKDIR /app
# ensure Alpine packages are up-to-date
RUN apk update && apk upgrade --no-cache
COPY package.json package-lock.json ./
# install only prod dependencies
RUN npm ci --omit=dev

# ─── Stage 2: Build (with dev deps) ──────────────
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk update && apk upgrade --no-cache
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ─── Stage 3: Production image (slim) ───────────
FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# copy only what we need
COPY --from=deps    /app/node_modules ./node_modules
COPY --from=builder /app/.next       ./.next
COPY --from=builder /app/public      ./public
COPY --from=builder /app/next.config.js ./

EXPOSE 3000
CMD ["npm", "run", "start"]
