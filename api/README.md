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

# Instructions for setting up Stripe:

1. Install Stripe CLI and login using the AUIS acount. Refer to instructions here: https://docs.stripe.com/stripe-cli 
2. Setup the appropriate .env files for both frontend and backend: see the #resources chat in discord. 
3. Setup webhook by following the Stripe docs: https://docs.stripe.com/payments/checkout/fulfill-orders?lang=node . Ensure that you use the following code to setup the webhook listen endpoint: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

Additional info: Stripe restricts all production web apps to run in HTTPS. HTTP for development is fine. 

# Notes:
Schema: users = admin users for strapi
Schema: people = users that sign up
Schema: user_tickets/people_tickets = tickets that the users purchase

Additional info: Stripe restricts all production web apps to run in HTTPS. HTTP for development is fine. 

Stripe will pay AUIS's bank account every 7-14 days' based on Stripe's risk assessment of AUIS. Read more here: https://docs.stripe.com/payouts

Stripe API Documentation: https://docs.stripe.com/api/

Accept a payment (embedded form): https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=embedded-form

Handle Payments (webhook included): https://docs.stripe.com/payments/handling-payment-events

Fulfill Orders (Webhook stuff): https://docs.stripe.com/payments/checkout/fulfill-orders

Register Webhook (FOR PRODUCTION): https://docs.stripe.com/webhooks#register-webhook

Product and Pricing: https://docs.stripe.com/products-prices/how-products-and-prices-work

# Instructions for setting up Clerk
Follow Step 1: Connect except the "DEPLOY YOUR APP ONLINE" part: https://dashboard.ngrok.com/get-started/setup/windows

Step 2: Run `ngrok http --url=https://gelding-trusty-exactly.ngrok-free.app 3000`. 

Step 3: Now try to create a new user and login. You should now see an event of type "user.created" in the console. 

# Instructions for testing with Clerk:

Email addresses
Any email with the +clerk_test subaddress is a test email address. No emails will be sent, and they can be verified with the code 424242.

For example:

jane+clerk_test@example.com
doe+clerk_test@example.com

# Additional articles for Clerk
https://clerk.com/docs/integrations/webhooks/overview

https://clerk.com/docs/integrations/webhooks/sync-data

https://ngrok.com/docs/integrations/clerk/webhooks/

https://docs.svix.com/receiving/verifying-payloads/how#nodejs-express

https://clerk.com/docs/deployments/overview
