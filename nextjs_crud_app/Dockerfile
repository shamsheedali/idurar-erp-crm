# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the files
COPY . .

# Set a default MONGODB_URI for build time (won't be used at runtime)
ARG MONGODB_URI=mongodb://mongo:27017/projectdb
ENV MONGODB_URI=${MONGODB_URI}

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Environment variables will be provided at runtime via compose
EXPOSE 3000

CMD ["npm", "start"]