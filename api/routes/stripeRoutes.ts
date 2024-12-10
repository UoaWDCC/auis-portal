import express, { Router, json } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import {
  createCheckout,
  getSessionStatus,
  handleWebhook,
} from "../controller/stripeController";

const router = Router();

// TODO: unprotect these routes
router.get(
  "/session-status",
  verifySession({ sessionRequired: false }),
  getSessionStatus
);
router.post(
  "/create-checkout",
  verifySession({ sessionRequired: false }),
  createCheckout
);

// do not protect this route
router.post(
  "/webhook",
  // Stripe requires the raw body to construct the event
  express.raw({ type: "application/json" }),
  handleWebhook
);

export default router;
