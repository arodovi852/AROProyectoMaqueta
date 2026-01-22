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

# Debug: Show build output structure
RUN echo "=== Build output structure ===" && \
    find /app/dist -type f -name "*.html" && \
    ls -la /app/dist/AROProyectoMaqueta/browser/ || true

# ==============================================================================
# STAGE 2: Serve with nginx
# ==============================================================================
FROM nginx:alpine

# Copy nginx configuration template
COPY nginx.conf /etc/nginx/nginx.conf.template

# Copy built application from builder stage
COPY --from=builder /app/dist/AROProyectoMaqueta/browser /usr/share/nginx/html

# Verify files were copied correctly
RUN echo "=== Nginx html content ===" && \
    ls -la /usr/share/nginx/html/ && \
    test -f /usr/share/nginx/html/index.html && echo "✓ index.html found" || echo "✗ index.html NOT found"

# Expose port (Render uses PORT env variable)
EXPOSE 80
EXPOSE 10000

# Default PORT if not set
ENV PORT=10000

# Start nginx with envsubst to replace PORT variable
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
