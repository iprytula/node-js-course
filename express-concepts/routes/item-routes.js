import express from "express";
import { asyncHandler } from "../middleware/error-handler.js";

const itemRoutes = express.Router();

const items = [
  { id: 1, name: "Item 1", description: "Description of Item 1" },
  { id: 2, name: "Item 2", description: "Description of Item 2" },
  { id: 3, name: "Item 3", description: "Description of Item 3" }
];

itemRoutes.get("/items", asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: items
  });
}));

export default itemRoutes;
