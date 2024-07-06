import express, { Router, json } from "express";
import bodyParser from "body-parser";
import * as http from "http";
import { protect } from "../middleware/authMiddleware";

// StripeJS: Load secret API key
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: "2024-06-20",
  typescript: true,
});

//frontend
const domainURL = process.env.DOMAIN_FRONTEND;

// use the Stripe CLI to generate your own endpoint and paste the value below.
const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT;

const router = Router();

// Only allowed to access if the user is logged in.
//router.use(protect);

// Create a checkout session based on priceId. Send a client secret back (cs_ABCD123)
router.post("/create-checkout-session", async (req, res) => {
  // in the incoming request, we need the priceID of the item we're buying.
  const { priceId } = req.body;
  //console.log(priceId);

  // epoch time in seconds, 30mins timeout
  let session_expiry = Math.floor(new Date().getTime() / 1000 + 30 * 60);
  //console.log("/create-checkout-session: session_expiry", session_expiry);

  // if priceId is undefined, send a 404 back.
  if (priceId == undefined) {
    return res.send({ error: "priceId was undefined." }).status(404);
  }

  try {
    // @Ratchet7x5: Add an auth middleware to ensure that incoming requests have a bearer token (pk_test/live_ABCD12345)
    // if no bearer token was found, send a 404 error. Also ensure user is logged in.
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      expires_at: session_expiry,
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      // @Ratchet7x5 INFO: The link below determines the
      // redirect page on frontend after successful payment.
      return_url: `${domainURL}return?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    res.send({ error }).status(404);
  }
});

router.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  //console.log("session-status: ", session);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

// @Ratchet7x5: use 'any' type for now
const fulfillOrder = (lineItems: any) => {
  // @Ratchet7x5: TODO: update a user_ticket with payment_status set to 'completed'
  console.log("Fulfilling order", lineItems);
};

const createOrder = (session: any) => {
  // @Ratchet7x5: TODO: insert a user_ticket with payment_status set to 'awaiting'
  console.log("Creating order", session);
};

const emailCustomerAboutFailedPayment = (session: any) => {
  // TODO: fill me in
  console.log("Emailing customer", session);
};

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const payload = req.body;
    //console.log("/webhook: payload: ", payload);

    // @Ratchet7x5 TODO: Check if NGINX strips this header in dev/prod
    const sig = req.headers["stripe-signature"];

    let webhook;

    try {
      webhook = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ` + err);
    }

    // Handle the checkout.session.completed event
    if (webhook.type === "checkout.session.completed") {
      // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        webhook.data.object.id,
        {
          expand: ["line_items"],
        }
      );
      const lineItems = sessionWithLineItems.line_items;

      console.log("/webhook: receipt_url: ");

      // Fulfill the purchase...
      fulfillOrder(lineItems);
    }

    res.status(200).end();
  }
);

export default router;
