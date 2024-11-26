import express, { Router, json } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import {
  createCheckout,
  getSessionStatus,
  handleWebhook,
} from "../controller/stripeController";

const router = Router();

router.get("/session-status", verifySession(), getSessionStatus);
router.post("/create-checkout", verifySession(), createCheckout);

// do not protect this route
router.post(
  "/webhook",
  // Stripe requires the raw body to construct the event
  express.raw({ type: "application/json" }),
  handleWebhook
);

export default router;
