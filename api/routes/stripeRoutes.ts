import express, { Router } from "express";
import * as http from 'http';
import { protect } from "../middleware/authMiddleware";

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

// StripeJS: Load secret API key
// TODO: @Ratchet7x5 Switch to live key based on NODE_ENV secret
const stripe_secret = process.env.STRIPE_SECRET_TEST;
const stripe = require("stripe")(`${stripe_secret}`);
const YOUR_DOMAIN = "http://localhost:5173"; //frontend

// needs to be in .env
const endpointSecret = 'whsec_503a5f8a18a32b5780baeef30b5bc1da329bfe71db5991e7cccc0d410710f0ab';

const router = Router();

// Only allowed to access if the user is logged in.
//router.use(protect);

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    // TODO: @Ratchet7x5 Attempt to create a checkout session WITHOUT line_items attribute
    line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1PSHWRP464csY2UpYpxvB2tk',
          quantity: 1,
        },
      ],
    mode: "payment",
    return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({ clientSecret: session.client_secret });
});

router.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

const fulfillOrder = (lineItems: any) => {
  // TODO: fill me in
  console.log("Fulfilling order", lineItems);
}

router.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
  const payload = req.body;
  const sig = req.headers['stripe-signature'];

  let webhookEvent;

  try {
    webhookEvent = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ` + err);
  }

  res.status(200).end();
});


export default router;