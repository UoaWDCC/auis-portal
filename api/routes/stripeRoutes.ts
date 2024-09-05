import express, { Router, json } from "express";
import { protect } from "../middleware/authMiddleware";
import { isTicketAvailableByEventId, reserveTicket, releaseReservedTicket } from "../gateway/eventsGateway";
import Stripe from "stripe";

// StripeJS: Load secret API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
  typescript: true,
});

const domainURL = process.env.DOMAIN_FRONTEND;

const endpointSecret: string = process.env.STRIPE_WEBHOOK_ENDPOINT as string;

const router = Router();

// Only allowed to access if the user is logged in.
//router.use(protect);

// Create a checkout session based on priceId. Send a client secret back (cs_ABCD123)
router.post("/create-checkout-session", async (req, res) => {
  // @Ratchet7x5: TODO: Add the ability to reserve tickets by event id OUTSIDE the express app.
  //                    eg: use Strapi or something to create a link or so.
  //attempt to reserve one ticket by event's id
  let ticketAvailable = await isTicketAvailableByEventId(1);

  if (ticketAvailable == false) {
    return res.send({error: "There are no tickets available. Please come back later to see if more tickets become available."})
  }

  // in the incoming request, we need the priceID of the item we're buying.
  const { priceId } = req.body;
  //console.log(priceId);

  // epoch time in seconds, 30mins timeout
  let session_expiry = Math.floor(new Date().getTime() / 1000 + 30 * 60);
  //console.log("/create-checkout-session : session_expiry", session_expiry);

  // if priceId is undefined, send a 404 back.
  if (priceId == undefined) {
    return res
      .send({
        error:
          "Product does not exist, or is not available for sale at the moment.",
      })
      .status(404);
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
      return_url: `${domainURL}return?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
    //console.log(session);
  } catch (error) {
    res.send({ error }).status(404);
  }
});

router.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(
    req.query.session_id as string
  );
  //console.log("/session-status: ", session);

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

    // Cast event data to Stripe object
    //Only insert into DB when the payment_intent succeeds
    if (event.type === "payment_intent.succeeded") {
      console.log(`PaymentIntent Object:`, JSON.stringify(event.data.object, null, 2));

      const stripeObject: Stripe.PaymentIntent = event.data.object as Stripe.PaymentIntent;
      //console.log(`PaymentIntent status: ${stripeObject.status}`);
      // insert into db
    } else if (event.type === "checkout.session.expired") {
      /**
       * How do we know that the expired session was for a particular event?
       * Example: Customer #0 checkout session for Event #0 expired. Return a ticket.
       */
      //console.log(`/webhook: event.type: ${event.type}`);
      console.log(`/webhook: todo: release ticket`);
      throw new Error("Checkout.session.expired, but no ticket was returned to the pool.")
    } else {
      //console.warn(`Unhandled event type: ${event.type}`);
      //console.warn(`Unhandled object: ${event.data.object}`);
    }

    res.json({ received: true });
  }
);

export default router;
