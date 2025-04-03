# Use lightweight Node.js image
FROM node:lts-alpine AS base

# Set working directory
WORKDIR /app

RUN echo "Copying package.json"
# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN echo "Installing pnpm..."
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

FROM prod-deps AS build
RUN echo "Copying rest..."
# Copy rest of the project files
COPY . .

RUN echo "Building project"
# Build Astro project
RUN pnpm run build

# Use a lightweight Node.js container for serving
FROM node:lts-alpine AS runtime

# Set working directory
WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

# Start the server
CMD ["node", "./dist/server/entry.mjs"]
