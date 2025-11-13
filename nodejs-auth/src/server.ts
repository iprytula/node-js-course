import express from "express";
import connectDB from "./database/database-connection";
import authRoutes from "./routes/auth-routes";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
