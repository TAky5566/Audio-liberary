import express from "express";
import {
  loginValidators,
  registerValidators,
  verifyValidators,
  authenticate,
  AuthorizeRole,
  forgetPasswordValidators,
  resetPasswordValidators,
} from "../middlewares/auth.middleware.js";
import { login } from "../controllers/login.controller.js";
import { register } from "../controllers/register.controller.js";
import { verify } from "../controllers/verify.controller.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/forget.controller.js";
const router = express.Router();

const loginRoute = router.post("/login", loginValidators, login);
const registerRoute = router.post("/register", registerValidators, register);
const verifyRoute = router.put("/verify/:token", verifyValidators, verify);
const Dashboard = router.get("/dashboard", authenticate, (req, res) => {
  res.send("hello", req.user.username);
});
const forgotPasswordRoute = router.post(
  "/forgetPassword/:email",
  forgetPasswordValidators,
  forgotPassword
);
const resetPasswordRoute = router.put(
  "/resetPassword/:token",
  resetPasswordValidators,
  resetPassword
);

export { router };
