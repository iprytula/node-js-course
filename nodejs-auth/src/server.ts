import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./database/database-connection";
import authRoutes from "./routes/auth-routes";
import adminRouter from "./routes/admin-routes";
import fileRouter from "./routes/file-routes";
import authMiddleware from "./middleware/auth-middleware";
import uploadMiddleware from "./middleware/uppload-middleware";


const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/admin", authMiddleware, adminRouter);
app.use("/api/files", authMiddleware, uploadMiddleware.single("image"), fileRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
}); 
