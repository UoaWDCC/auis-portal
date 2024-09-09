import express, { Router, json } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  isTicketAvailableByEventId,
  reserveTicket,
  releaseReservedTicket,
  completeTicketPurchase,
} from "../gateway/eventsGateway";
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
  const eventId = 0; //const { eventId } = req.body;

  let ticketAvailable = await isTicketAvailableByEventId(eventId);

  if (ticketAvailable == false) {
    return res.send({
      error:
        "There are no tickets available. Please come back later to see if more tickets become available.",
    });
  } else {
    reserveTicket(0);
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
    const session = await stripe.checkout.sessions.create({
      //do not change anything below
      ui_mode: "embedded",
      expires_at: session_expiry,
      line_items: [
        {
          // Provide the exact Price ID (pr_1234) of the product on sale
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_types: ["card"],
      currency: "NZD",
      return_url: `${domainURL}return?session_id={CHECKOUT_SESSION_ID}`,

      //changeable below:
      // use metadata property
      metadata: { eventId: `${eventId}` },
    });

    res.send({ clientSecret: session.client_secret });
    console.log("/create-checkout-session: Creating new session: ", session.id);
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

    // Cast event data to Stripe object
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("/webhook: checkout.session.completed: ", session);

      //insert into db
      completeTicketPurchase(event.data.object.id);
    } else if (event.type === "checkout.session.expired") {
      /**
       * How do we know that the expired session was for a particular event?
       * Example: Customer #0 checkout session for Event #0 expired. Return a ticket to Event #0.
       */
      const session = event.data.object;
      console.log(`/webhook: event.type: ${event.type}`);
      console.log(
        `Expired Session Object:`,
        JSON.stringify(event.data.object, null, 2)
      );
      if (event.data.object.metadata != null) {
        console.log(
          `/webhook: releasing one ticket to eventId: ${event.data.object.metadata["eventId"]}`
        );
        releaseReservedTicket(event.data.object.metadata["eventId"]);
      } else {
        // if it was null
      }
      //throw new Error("Checkout.session.expired, but no ticket was returned to the pool.");
    } else {
      //console.warn(`Unhandled event type: ${event.type}`);
      //console.warn(`Unhandled object: ${event.data.object}`);
    }

    res.json({ received: true });
  }
);

export default router;
