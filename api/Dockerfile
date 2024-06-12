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

# Mount secrets into Dockerfile and set environment variables
RUN --mount=type=secret,id=DATABASE_HOST \
    --mount=type=secret,id=DATABASE_PORT \
    --mount=type=secret,id=DATABASE_USERNAME \
    --mount=type=secret,id=DATABASE_PASSWORD \
    DATABASE_HOST="$(cat /run/secrets/DATABASE_HOST)" \
    DATABASE_PORT="$(cat /run/secrets/DATABASE_PORT)" \
    DATABASE_USERNAME="$(cat /run/secrets/DATABASE_USERNAME)" \
    DATABASE_PASSWORD="$(cat /run/secrets/DATABASE_PASSWORD)" 

# Copy drizzle configuration file
COPY drizzle.config.ts .

# Copy schemas folder from api directory
COPY schemas ./schemas

#Copy migrate script from api directory
COPY scripts ./scripts

#Copy db config script from api directory
COPY db ./db

#Need to run the generation 
RUN yarn run db:generate

COPY db/migrations ./db/migrations

#Need to run the migration
RUN yarn run db:migrate

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