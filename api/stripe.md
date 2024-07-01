# Instructions for setting up Stripe:

1. Install Stripe CLI and login using the AUIS acount. Refer to instructions here: https://docs.stripe.com/stripe-cli 
2. Setup the appropriate .env files for both frontend and backend: see the #resources chat in discord. 
3. Setup webhook by following the Stripe docs: https://docs.stripe.com/payments/checkout/fulfill-orders?lang=node

Additional info: Stripe restricts all production web apps to run in HTTPS. HTTP for development is fine. 


# Issues

1. [Frontend] The Stripe Embedded Form does not display. 
2. Strapi does not run in HTTPS. 

# Todo:

1. Transplant Stripe code into Strapi OR Create a new module in Strapi to use Stripe. 
2. Strapi must run in HTTPS. Use the mkcert tool/library. `mkcert -install localhost`
3. Frontend: Ensure that the events page has relevant priceIds associated and is sent to /create-checkout-session. Each event page will go to a /checkout page (frontend) and will then retrieve the priceId (from react-router probably) and the checkout form will be for that specific event. 