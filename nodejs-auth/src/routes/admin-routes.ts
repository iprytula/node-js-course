import authMiddleware from "../middleware/auth-middleware";
import express, { Request, Response } from "express";

const adminRouter = express.Router();

adminRouter.get("/", authMiddleware, (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Admin Dashboard"
  });
});

export default adminRouter;