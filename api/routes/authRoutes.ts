import express from "express";
import { signOut } from "../controller/authController";

const router = express.Router();

router.post("/signout", signOut);

export default router;
