import express from "express";
import authMiddleware from "../middleware/auth-middleware";
import {
  registerUser,
  loginUser,
  changePassword,
  logOutUser
} from "../controllers/auth-controller";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/change-password", authMiddleware, changePassword);
authRouter.post("/logout", authMiddleware, logOutUser);

export default authRouter;
