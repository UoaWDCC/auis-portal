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