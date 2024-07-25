import express from "express";
import {
  getTeamInfo,
  getCredits,
  getOurPurpose,
} from "../controller/creditController";

const router = express.Router();

router.get("/team", getTeamInfo);
router.get("/credits", getCredits);
router.get("/our-purpose", getOurPurpose);

export default router;
