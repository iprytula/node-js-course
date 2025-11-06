require("dotenv").config();

const express = require("express");
const connectToDB = require("./database/db");
const bookRoutes = require("./routes/book-routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/books", bookRoutes);

const startServer = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer();
