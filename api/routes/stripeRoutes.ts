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
  handleWebhook,
} from "../controller/stripeController";
import Stripe from "stripe"; //Types and Interfaces
import { stripe } from "../stripe/stripe";

const router = Router();

// Only allowed to access if the user is logged in.
//router.use(protect);

router.get("/session-status", getSessionStatus);
router.post("/create-event-checkout", createEventCheckoutSession);
router.post("/create-membership-checkout", createEventCheckoutSession);
router.post(
  "/webhook",
  // Stripe requires the raw body to construct the event
  express.raw({ type: "application/json" }),
  handleWebhook
);

export default router;
