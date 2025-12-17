##############################################
# 1) Build Stage (Vite + Node)
##############################################
FROM node:20-alpine AS builder

WORKDIR /app

# Fix npm registry issues when running inside Jenkins Kubernetes pods
RUN npm config set registry http://registry.npmjs.org/ \
    && npm config set strict-ssl false

# Build args forwarded from Jenkins pipeline
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Expose these to Vite build
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build production bundle
RUN npx vite build


##############################################
# 2) Production Stage (NGINX)
##############################################
FROM nginx:alpine

# Remove default config & create SPA routing config
RUN rm /etc/nginx/conf.d/default.conf \
    && printf "server {\n\
        listen 80;\n\
        server_name _;\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
        location / {\n\
            try_files \$uri \$uri/ /index.html;\n\
        }\n\
    }\n" > /etc/nginx/conf.d/default.conf

# Copy built frontend files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# FIX: Run NGINX in foreground (prevents CrashLoopBackOff)
CMD ["nginx", "-g", "daemon off;"]