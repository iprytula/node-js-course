import express, { Request, Response } from "express";

const homeRouter = express.Router();

homeRouter.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Home Page"
  });
});

export default homeRouter;