import { rateLimit } from "express-rate-limit";

export const createRateLimiter = (maxRequestsNumber, time) => rateLimit({
  max: maxRequestsNumber,
  windowMs: time,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false
});