# 🚀 Getting started with Strapi

### How To Run
In order to run Strapi locally, there are a few things you need to setup first. Strapi is connected to a postgres database to store the data and hence a postgres database needs to be provisioned. Follow the commands below to get started. This assumes that the current working directory is 

```bash
cd strapi
```

```bash
cd postgres
```
```bash
docker compose up
```


Then on another terminal
```bash
yarn develop
```

That is it. You should be good to go to use Strapi and Postgres locally to develop your application

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```
