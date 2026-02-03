import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

declare global {
  namespace Express {
    interface Request {
      userInfo?: JwtPayload & { role: string };
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized"
      });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret-key"
    ) as JwtPayload & { role: string };

    req.userInfo = decodedToken;

    if (decodedToken.role !== "admin") {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized"
      });
    }

    next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server Error"
    });
  }
};

export default authMiddleware;
