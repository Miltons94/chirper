
# Stage 1: Build frontend assets
FROM node:22-alpine AS frontend

# Render passes service environment variables as Docker build args. Vite embeds
# these public Pusher settings into the frontend bundle during this stage.
ARG VITE_PUSHER_APP_KEY
ARG VITE_PUSHER_APP_CLUSTER
ARG VITE_PUSHER_HOST
ARG VITE_PUSHER_PORT

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# Stage 2: Run Laravel
FROM dunglas/frankenphp:php8.5

RUN install-php-extensions \
  pdo_pgsql \
  mbstring \
  bcmath \
  intl \
  zip \
  gd \
  opcache

RUN setcap -r /usr/local/bin/frankenphp

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install \
  --no-dev \
  --prefer-dist \
  --optimize-autoloader \
  --no-interaction

COPY --from=frontend /app/public/build ./public/build

RUN mkdir -p \
  storage/framework/cache \
  storage/framework/sessions \
  storage/framework/views \
  storage/logs \
  bootstrap/cache \
  && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8080
ENV SERVER_NAME=:8080

CMD ["sh", "-c", "php artisan migrate --force && frankenphp php-server -r public/"]
