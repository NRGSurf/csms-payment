# =========================
# Builder: install, build
# =========================
FROM node:22-alpine AS builder
WORKDIR /app

# Useful for some native deps
RUN apk add --no-cache libc6-compat

# 1) Install deps WITHOUT running postinstall (tokens)
COPY package*.json ./
RUN if [ -f package-lock.json ]; then \
      npm ci --ignore-scripts; \
    else \
      npm install --ignore-scripts; \
    fi

# 2) Copy the full source (now scripts/ and design/ exist)
COPY . .

# 3) Build design tokens AFTER sources are present
#    (If you want a soft failure, append `|| echo "skip tokens build"`.)
RUN npm run tokens:build

# 4) Build Next.js
RUN npm run build

# 5) Produce **production-only node_modules** (no scripts)
#    Fresh install to ensure devDeps are removed cleanly.
RUN rm -rf node_modules && \
    if [ -f package-lock.json ]; then \
      npm ci --omit=dev --ignore-scripts; \
    else \
      npm install --omit=dev --ignore-scripts; \
    fi

# =========================
# Runner: minimal image
# =========================
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Non-root user
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copy only what we need to run
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# If your app needs anything else at runtime (rare), copy it explicitly:
# COPY --from=builder /app/styles ./styles
# COPY --from=builder /app/theme ./theme

USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]
