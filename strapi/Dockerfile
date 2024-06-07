# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.5.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ARG YARN_VERSION=1.22.19
RUN npm install -g yarn@$YARN_VERSION --force


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 ca-certificates fuse3 sqlite3

COPY --from=flyio/litefs:0.5 /usr/local/bin/litefs /usr/local/bin/litefs

# Install node modules
COPY --link package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Copy application code
COPY --link . .

# Build application
RUN yarn run build

# Remove development dependencies
RUN yarn install --production=true

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 1337
# Set environment variables directly in Dockerfile
ENV HOST=0.0.0.0
ENV PORT=1337
ENV APP_KEYS=vaEOk0CuEZmG8/uZAw6n7A==,BNF7ZAJF6tvG8E8oDte9wg==,rCVDv1cLeXxhf4Q6GFN2kQ==,zIWtoLzYiPhiCnfgwlMmYw==
ENV API_TOKEN_SALT=7w67Lb9IjfLwJicbkTN0Yw==
ENV ADMIN_JWT_SECRET=TxtJWG4j4eKppUS2OPIFXA==
ENV TRANSFER_TOKEN_SALT=CyegCPvHAZbV+RajcOuYUg==
ENV DATABASE_CLIENT=sqlite
ENV DATABASE_FILENAME=.tmp/data.db
ENV JWT_SECRET=7eQX6q8WAof7LOi7+uQf8A==
CMD [ "yarn", "run", "start" ]