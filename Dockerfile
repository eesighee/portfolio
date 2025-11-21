# Dockerfile

# 1. Base Image for dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Builder Image
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run the build command
RUN npm run build

# 3. Production Image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy the standalone Next.js server output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# The optimize-images script is run as a prebuild step, so the images are already optimized.
# If you add new images, you'll want to either run this locally or add a step in your CI/CD pipeline to run it.

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
