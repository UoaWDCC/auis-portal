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
import { UserRoleClaim } from "supertokens-node/lib/build/recipe/userroles/userRoleClaim";

const router = Router();

router.get(
  "/attendance",
  verifySession({
    overrideGlobalClaimValidators: async (globalValidators) => [
      ...globalValidators,
      UserRoleClaim.validators.includes("exec"),
      // UserRoles.PermissionClaim.validators.includes("edit")
    ],
  }),
  getEventAttendanceById
);
router.patch(
  "/attendance",
  verifySession({
    overrideGlobalClaimValidators: async (globalValidators) => [
      ...globalValidators,
      UserRoleClaim.validators.includes("exec"),
      // UserRoles.PermissionClaim.validators.includes("edit")
    ],
  }),
  updateAttendanceById
);

export default router;
