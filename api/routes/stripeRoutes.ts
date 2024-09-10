import express, { Router, json } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  isTicketAvailableByEventId,
  reserveTicket,
  releaseReservedTicket,
  completeTicketPurchase,
} from "../gateway/eventsGateway";
import Stripe from "stripe"; //Types and Interfaces
import { stripe } from "../stripe/stripe"; 

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

  // epoch time in seconds, 30mins timeout
  let session_expiry = Math.floor(new Date().getTime() / 1000 + 30 * 60);

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
  } catch (error) {
    res.send({ error }).status(404);
  }
});

router.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(
    req.query.session_id as string
  );

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
      res.status(400).send(`Webhook Error: ${err}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      const session: Stripe.Checkout.Session = event.data.object;
      completeTicketPurchase(session.id);
    } else if (event.type === "checkout.session.expired") {
      const session = event.data.object;

      if (
        session.metadata != null &&
        session.metadata["eventId"] != undefined
      ) {
        releaseReservedTicket(session.metadata["eventId"]);
      }
    }

    res.json({ received: true });
  }
);

export default router;
