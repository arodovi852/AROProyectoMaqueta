# ==============================================================================
# STAGE 1: Build the Angular application
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application for production
RUN npm run build

# ==============================================================================
# STAGE 2: Serve with nginx
# ==============================================================================
FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy nginx configuration template
COPY nginx.conf /etc/nginx/nginx.conf.template

# Copy built application from builder stage
COPY --from=builder /app/dist/AROProyectoMaqueta/browser /usr/share/nginx/html

# Verify files and show content
RUN echo "=== Contents of /usr/share/nginx/html ===" && \
    ls -la /usr/share/nginx/html/ && \
    echo "=== Checking index.html ===" && \
    head -5 /usr/share/nginx/html/index.html

# Expose port (Render uses PORT env variable)
EXPOSE 10000

# Default PORT if not set by Render
ENV PORT=10000

# Use sed to replace NGINX_PORT with actual PORT value, then start nginx
CMD ["/bin/sh", "-c", "sed -i \"s/NGINX_PORT/$PORT/g\" /etc/nginx/nginx.conf.template && cp /etc/nginx/nginx.conf.template /etc/nginx/nginx.conf && echo '=== Final nginx.conf ===' && cat /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
