import express from "express";
import { configDotenv } from "dotenv";
import { configureCors } from "./config/cors-config.js";
import { requestLogger } from "./middleware/request-logger.js";
import { globalErrorHandler } from "./middleware/error-handler.js";
import { urlVersioning } from "./middleware/api-versioning.js";
import { createRateLimiter } from "./middleware/rate-limiting.js";
import itemRoutes from "./routes/item-routes.js";

configDotenv();

const PORT = process.env.PORT || 3000;
const app = express();
const API_VERSION = "v1";

app.use(express.json());

app.use(configureCors());

app.use(requestLogger);


const rateLimiter = createRateLimiter(100, 15 * 60 * 1000);
app.use(rateLimiter);

app.use(urlVersioning(API_VERSION));
app.use("/api/v1", itemRoutes);

app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.send(`Hello World! Request timestamp: ${req.requestTime}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
