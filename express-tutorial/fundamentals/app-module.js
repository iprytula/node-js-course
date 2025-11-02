const express = require("express");
const app = express();
const port = 3000;

// application level settings
app.set("view engine", "ejs");

// routing
app.get("/", (req, res) => {
  res.send("Home page");
});

app.post("/api/data", (req, res) => {
  res.json({
    message: "Data received",
    data: req.body,
  });
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
