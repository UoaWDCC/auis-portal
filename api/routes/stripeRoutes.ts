import express, { Router, json } from "express";
import { protect } from "../middleware/authMiddleware";
import Stripe from "stripe";
import { user_tickets } from "../schemas/schema";
import { sql } from "drizzle-orm";

// StripeJS: Load secret API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
  typescript: true,
});

//frontend
const domainURL = process.env.DOMAIN_FRONTEND;

// use the Stripe CLI to generate your own endpoint and paste the value below.
const endpointSecret: string = process.env.STRIPE_WEBHOOK_ENDPOINT as string;

const router = Router();

// Only allowed to access if the user is logged in.
//router.use(protect);

// Create a checkout session based on priceId. Send a client secret back (cs_ABCD123)
router.post("/create-checkout-session", async (req, res) => {
  //check for an available ticket

  //reserve one ticket

  // in the incoming request, we need the priceID of the item we're buying.
  const { priceId } = req.body;
  //console.log(priceId);

  // epoch time in seconds, 30mins timeout
  let session_expiry = Math.floor(new Date().getTime() / 1000 + 30 * 60);
  //console.log("/create-checkout-session : session_expiry", session_expiry);

  // if priceId is undefined, send a 404 back.
  if (priceId == undefined) {
    return res.send({ error: "priceId was undefined." }).status(404);
  }

  try {
    // @Ratchet7x5: TODO: Add an auth middleware to ensure that incoming requests have a bearer token (pk_test/live_ABCD12345)
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
  const session = await stripe.checkout.sessions.retrieve(
    req.query.session_id as string
  );
  console.log("session-status: ", session);

  res.send({
    status: session.status,
    customer_email: session.customer_details?.email,
  });
});

router.post(
  "/webhook",
  // Stripe requires the raw body to construct the event
  express.raw({ type: "application/json" }),
  async (req: express.Request, res: express.Response): Promise<void> => {
    const sig = req.headers["stripe-signature"] as string | string[] | Buffer;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      // On error, log and return the error message
      console.log(`Error message: ${err}`);
      res.status(400).send(`Webhook Error: ${err}`);
      return;
    }

    // Successfully constructed event
    //console.log("Success:", event.id);

    /*
    Account for the following events:
    charge.succeeded
    charge.refunded
    charge.failed
    checkout.session.async_payment_failed
    checkout.session.async_payment_succeeded
    checkout.session.completed
    payment_intent.succeeded
    */

    // Cast event data to Stripe object
    /*if (event.type === "payment_intent.succeeded") {
      const stripeObject: Stripe.PaymentIntent = event.data
        .object as Stripe.PaymentIntent;
      console.log(`PaymentIntent status: ${stripeObject.status}`);
      //insert into db
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object; // as Stripe.Charge;
      console.log(`/webhook: event.type: ${event.type}`);
      console.log(
        `/webhook: charge.succeeded: ${event.data.object.billing_details.email} ${event.data.object.paid}`
      );
      //insert into db
    } else*/ if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log(`/webhook: event.type: ${event.type}`);
      console.log(`/webhook: payment.status: ${session.payment_status}`);
      console.log("/webhook: checkout.session.completed: ", session);
      //insert into db
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
      console.warn(`Unhandled object: ${event.data.object}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

export default router;
