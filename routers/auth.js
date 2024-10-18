import { Router } from "express";
import { signUp, verifyOtp, signIn } from "../contrllers/auth.js";
import {
  SignUpSchema,
  verifyOtpSchema,
  signInSchema
} from "../contrllers/requests.js";
import { createValidator } from "express-joi-validation";

const validator = createValidator();

const router = Router();

router.post("/signUp", validator.body(SignUpSchema), signUp);
router.post("/verify", validator.body(verifyOtpSchema), verifyOtp);
router.post("/signIn", validator.body(signInSchema), signIn)

export default router;