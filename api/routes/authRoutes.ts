import express from "express";
import { signUp, logIn, handleWebhook } from "../controller/authController";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", logIn);
router.post("/webhook", handleWebhook);

export default router;
