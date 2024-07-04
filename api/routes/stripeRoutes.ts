import express, { Router, json } from "express";
import * as http from "http";
import { protect } from "../middleware/authMiddleware";

// Use body-parser to retrieve the raw body as a buffer
import bodyParser from "body-parser";

// StripeJS: Load secret API key
// TODO: @Ratchet7x5 Switch to live key based on NODE_ENV secret
const stripe_secret = process.env.STRIPE_SECRET_TEST;
const stripe = require("stripe")(`${stripe_secret}`);

//frontend,  replace with process.env.domainURL. Switch based on NODE_ENV
const domainURL = "http://localhost:5173";

// needs to be in .env
// use the Stripe CLI to generate your own endpoint and paste the value below.
// I've left this value in here intentionally.
const endpointSecret =
  "whsec_503a5f8a18a32b5780baeef30b5bc1da329bfe71db5991e7cccc0d410710f0ab";

const router = Router();

// Only allowed to access if the user is logged in.
//router.use(protect);

// Create a checkout session based on priceId. Send a client secret back (cs_ABCD123)
router.post("/create-checkout-session", async (req, res) => {
  // in the incoming request, we need the priceID of the item we're buying.
  const { priceId } = req.body; //const priceId = req.body.priceId;
  //console.log(priceId);
  console.log(req.body);

  // if priceId is undefined, send a 404 back.
  if (priceId == undefined) {
    return res.send({ error: "priceId was undefined." }).status(404);
  }

  try {
    // @Ratchet7x5: Add an auth middleware to ensure that incoming requests have a bearer token (pk_test/live_ABCD12345)
    // if no bearer token was found, send a 404 error. Also ensure user is logged in.
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      // @Ratchet7x5 INFO: The link below determines the redirect page after successful payment.
      return_url: `http://localhost:5173/return?session_id={CHECKOUT_SESSION_ID}`,
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

// @Ratchet7x5: Template webhook code below. Possibly UNSTABLE.
// use 'any' type for now
const fulfillOrder = (lineItems: any) => {
  // TODO: fill me in
  console.log("Fulfilling order", lineItems);
};

const createOrder = (session: any) => {
  // TODO: fill me in
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
