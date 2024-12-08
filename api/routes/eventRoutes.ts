import express, { Router, json } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import {
  createCheckout,
  getSessionStatus,
  handleWebhook,
} from "../controller/stripeController";
import { getUserTickets } from "../gateway/eventsGateway";
import {
  getEventAttendanceById,
  updateAttendanceById,
} from "../controller/eventController";

const router = Router();

router.get("/attendance", getEventAttendanceById);
router.patch("/attendance", updateAttendanceById);

export default router;

