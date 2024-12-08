import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
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
    ],
  }),
  updateAttendanceById
);

export default router;
