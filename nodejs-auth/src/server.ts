import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

import express from "express";
import connectDB from "./database/database-connection";
import authRoutes from "./routes/auth-routes";
import homeRouter from "./routes/home-routes";
import adminRouter from "./routes/admin-routes";


const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/home", homeRouter);
app.use("/admin", adminRouter)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
