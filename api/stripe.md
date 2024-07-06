# Instructions for setting up Stripe:

1. Install Stripe CLI and login using the AUIS acount. Refer to instructions here: https://docs.stripe.com/stripe-cli 
2. Setup the appropriate .env files for both frontend and backend: see the #resources chat in discord. 
3. Setup webhook by following the Stripe docs: https://docs.stripe.com/payments/checkout/fulfill-orders?lang=node . Ensure that you use the following code to setup the webhook listen endpoint: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

Additional info: Stripe restricts all production web apps to run in HTTPS. HTTP for development is fine. 


# Issues

1. ~~[Frontend] The Stripe Embedded Form does not display.~~
2. Strapi does not run in HTTPS. 

# Todo:

1. Transplant Stripe code into Strapi OR Create a new module in Strapi to use Stripe. 
2. Strapi must run in HTTPS. Use the mkcert tool/library. `mkcert -install localhost`
3. Frontend: Ensure that the events page has relevant priceIds associated and is sent to /create-checkout-session. Each event page will go to a /checkout page (frontend) and will then retrieve the priceId (from react-router probably) and the checkout form will be for that specific event. 
4. Add `/api` proxy to vite in frontend
5. Check if NGINX will strip the header `['stripe-signature']` in dev/prod. 
6. Switch to stripe secret from test key to live key based on `NODE_ENV` secret
7. Ask @gmat224 if we need to worry about multiple quantities of tickets purchased. 
8. Set `expires_at` in `/create-checkout-session` 
9. Ask @gmat224 if tax collection needs to be enabled for transactions. 

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


