import { Router } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import {
  getAllUsers,
  getUserMetadata,
  updateUserInfo,
  updateUserMetadata,
  deleteUserMetadata,
  getTest,
} from "../controller/userController";

const router = Router();

router.get("/users", getAllUsers);
router.post("/update-user-info", verifySession(), updateUserInfo);
router.get("/get-metadata", verifySession(), getUserMetadata);
router.get("/test", verifySession(), getTest);
router.post("/update-metadata", verifySession(), updateUserMetadata);
router.post("/delete-metadata", verifySession());

export default router;
