## How To Run

First of all, the api is running on port 3000 and make sure you have the database up and running since that is what the backend will be connecting with. Once you have that running, follow the commands below

To install dependencies
```bash
yarn
```
To run the development server
```bash
yarn dev
```
To run production build
```bash
yarn build
```

## Technologies

This documentation would explain what Drizzle is as well as how to this folder structure operates to get the code connected to the database.

Drizzle is a TypeScript ORM (Object RelationaL Mapper) that allows us to write TypeScript code to directly interact with our database instead of having to painfully write raw SQL. Drizzle is lightweight in nature which results in it being really fast when in comparison to other ORM's like Prisma in terms of performance. Drizzle also provides multiple drivers that allows us to connect to any database of our choice which in our case we using the Postgres driver. Below is the documentation to Drizzle ORM

https://orm.drizzle.team/

## Getting Started

We define our Schema in the /schemas folder. There is an example schema already in the file. Upon writing our schema, navigate to the root directory of the project where our package.json file is located and run the yarn scripts below in sequence

```bash
yarn db:generate
yarn db:migrate
```

The first script would generate our TypeScript schema into SQL code which will be located in the migrations folder using drizzle-kit. Below is the official documentation for drizzle-kit

https://orm.drizzle.team/kit-docs/overview

An example of a migration can be found in this folder. The second script would then migrate our SQL schema to Postgres database using the migrate.ts file. To simplify this process, there is also another yarn script which runs both of these commands simulatenously.

```bash
yarn db
```

Additionally, there is a third script called seed.ts would automatically populate the database with some data. To perform this action, run the following yarn script. Not this script is merely there to populate the database and to test the database with some dummy data. We will not be running this script otherwise.

```bash
yarn db:seed
```

In order to visualise the database, there are two ways that we can do it. Firstly, we can visualise the database on Postgres which is the ideal way of doing it. However, to automate the process, there is a yarn script which you can run to visualise the database on your local machine using Drizzle Studio. Note that Drizzle Studio is currenty in Beta. To do this run the following yarn script.

```bash
yarn db:visualise
```

Finally, the db.ts is where the configuration file is for the Drizzle and Postgres database that allows us to export the database and perform queries against the database in drizzle syntax.

## Structure

There is a gateway folder that shows an example of how to query the database using Drizzle. Any queries to the database should be done in this gateway folder where the name of the file is the name of the function that performs the query.

## Tools

There is a yarn script called yarn watch-types that would automatically create corresponding backend types for your front-end project (./web/src/types/backend-types.ts) whenever you make changes to the types file inside this api project. To run this follow the command below

```bash
yarn watch-types
```
