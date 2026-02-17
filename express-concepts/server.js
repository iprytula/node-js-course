import express from "express";
import { configDotenv } from "dotenv";
import { configureCors } from "./config/cors-config.js";
import { addTimestamp, requestLogger } from "./middleware/request-logger.js";

configDotenv();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(configureCors());
app.use([requestLogger, addTimestamp]);

app.get("/", (req, res) => {
  res.send(`Hello World! Request timestamp: ${req.requestTime}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
