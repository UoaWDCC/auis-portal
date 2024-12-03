import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import {
  getUserMetadata,
  updateUserInfo,
  updateUserMetadata,
  getUserMembershipExpiry,
  updateUserTicketInfo,
} from "../controller/userController";

const router = Router();

router.post("/update-user-info", verifySession(), updateUserInfo);
router.post("/update-metadata", verifySession(), updateUserMetadata);
router.post("/user-ticket-info", verifySession(), updateUserTicketInfo);
router.get("/get-metadata", verifySession(), getUserMetadata);
router.get("/get-membership-expiry", verifySession(), getUserMembershipExpiry);

export default router;
