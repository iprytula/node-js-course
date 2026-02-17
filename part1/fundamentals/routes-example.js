const express = require("express");
const app = express();

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Smartphone" },
  { id: 3, name: "Tablet" },
];

app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/about", (req, res) => {
  res.send("Welcome to the about page!");
});

app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/products/:id", (req, res) => {
  const productId = req.params.id;

  const product = products.find((p) => p.id === parseInt(productId));
  if (product) {
    res.send(product);
  }
});
