const express = require("express");
const app = express();

//define middleware function

const myFirstMiddleware = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};

app.use(myFirstMiddleware);

app.get("/", (req, res) => {
  res.send("Home page!");
});

app.get("/about", (req, res) => {
  res.send("About page!");
});

app.get("/contact", (req, res) => {
  res.send("Contact page!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
