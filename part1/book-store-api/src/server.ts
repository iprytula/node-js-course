import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import connectToDB from "./database/db";
import bookRoutes from "./routes/book-routes";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/custom-error";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/api/books", bookRoutes);

// Handle 404 - Route not found
app.use((req: Request, res: Response) => {
  throw new NotFoundError(`Route ${req.originalUrl} not found`);
});

// Error handling middleware (must be last)
app.use(errorHandler);

const startServer = async (): Promise<void> => {
  await connectToDB();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer();
