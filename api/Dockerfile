# syntax = docker/dockerfile:1
# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.19.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ARG YARN_VERSION=1.22.19
RUN npm install -g yarn@$YARN_VERSION --force

# Throw-away build stage to reduce size of final image
FROM base as install 

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link package.json yarn.lock ./
RUN yarn install --frozen-lockfile

ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG DOMAIN_API
ARG DOMAIN_FRONTEND
ARG DOMAIN_STRAPI
ARG SUPERTOKENS_PORT
ARG STRIPE_SECRET_KEY
ARG STRIPE_WEBHOOK_ENDPOINT
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG SUPERTOKENS_API_KEY
ARG SMTP_HOST
ARG SMTP_PORT
ARG SMTP_USER
ARG SMTP_PASS
  
# Set environment variables
ENV DATABASE_HOST=${DATABASE_HOST}
ENV DATABASE_PORT=${DATABASE_PORT}
ENV DATABASE_USERNAME=${DATABASE_USERNAME}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV DOMAIN_API=${DOMAIN_API}
ENV DOMAIN_FRONTEND=${DOMAIN_FRONTEND}
ENV DOMAIN_STRAPI=${DOMAIN_STRAPI}
ENV SUPERTOKENS_PORT=${SUPERTOKENS_PORT}
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV STRIPE_WEBHOOK_ENDPOINT=${STRIPE_WEBHOOK_ENDPOINT}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV SUPERTOKENS_API_KEY=${SUPERTOKENS_API_KEY}
ENV SMTP_HOST=${SMTP_HOST}
ENV SMTP_PORT=${SMTP_PORT}
ENV SMTP_USER=${SMTP_USER}
ENV SMTP_PASS=${SMTP_PASS}

# Copy application code
COPY --link . .

FROM base as build

COPY --from=install /app /app

RUN yarn run build

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "yarn", "run", "start" ]