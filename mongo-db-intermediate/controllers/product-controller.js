import expres from "express";
import Product from "../models/Product.js";

const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      { name: "Laptop", price: 999.99, category: "Electronics" , tags: ["computer", "technology"]},
      { name: "Smartphone", price: 699.99, category: "Electronics", tags: ["mobile", "technology"] },
      { name: "Coffee Maker", price: 49.99, category: "Home Appliances", tags: ["kitchen", "appliance"] },
      { name: "Headphones", price: 199.99, category: "Electronics", tags: ["audio", "music"] },
      { name: "Blender", price: 89.99, category: "Home Appliances", tags: ["kitchen", "appliance"] },
    ];
    
    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({ message: "Sample products inserted", data: result });
  } catch (error) {
    res.status(500).json({ message: "Error inserting sample products", error });
  }
};

export { insertSampleProducts };