import express, { Router, json } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  isTicketAvailableByEventId,
  reserveTicket,
  releaseReservedTicket,
  completeTicketPurchase,
} from "../gateway/eventsGateway";
import {
  createEventCheckoutSession,
  getSessionStatus,
} from "../controller/stripeController";
import Stripe from "stripe"; //Types and Interfaces
import { stripe } from "../stripe/stripe";

const endpointSecret: string = process.env.STRIPE_WEBHOOK_ENDPOINT as string;

const router = Router();

// Only allowed to access if the user is logged in.
//router.use(protect);

router.post("/create-event-checkout", createEventCheckoutSession);
router.post("/create-membership-checkout", createEventCheckoutSession);
router.get("/session-status", getSessionStatus);

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
        releaseReservedTicket(parseInt(session.metadata["eventId"]));
      }
    }

    res.json({ received: true });
  }
);

export default router;
