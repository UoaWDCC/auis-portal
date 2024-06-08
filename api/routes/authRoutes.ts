import express from 'express';
import {signUp, logIn, clerkSignUp} from "../controller/authController"

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', logIn);
router.post('/clerk-sign-up', clerkSignUp);

export default router;
