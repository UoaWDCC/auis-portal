import express from 'express';
import { signUp, logIn } from "../controller/authController"

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/login', logIn);

export default router;
