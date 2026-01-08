import Product from "../models/Product.js";

const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Laptop",
        price: 999.99,
        category: "Electronics",
        tags: ["computer", "technology"],
        inStock: true,
      },
      {
        name: "Smartphone",
        price: 699.99,
        category: "Electronics",
        tags: ["mobile", "technology"],
        inStock: false,
      },
      {
        name: "Coffee Maker",
        price: 49.99,
        category: "Home Appliances",
        tags: ["kitchen", "appliance"],
        inStock: true,
      },
      {
        name: "Headphones",
        price: 199.99,
        category: "Electronics",
        tags: ["audio", "music"],
        inStock: false,
      },
      {
        name: "Blender",
        price: 89.99,
        category: "Home Appliances",
        tags: ["kitchen", "appliance"],
        inStock: true,
      },
    ];

    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          inStock: true,
          price: { $gte: 100 },
        },
      },
      {
        $group: {
          _id: "$category",
          avgPrice: { $avg: "$price" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: "Electronics",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$price" },
          avgPrice: { $avg: "$price" },
          maxPrice: { $max: "$price" },
          minPrice: { $min: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          avgPrice: 1,
          maxPrice: 1,
          minPrice: 1,
          priceRange: { $subtract: ["$maxPrice", "$minPrice"] },
        },
      },
    ]);

    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export { insertSampleProducts, getProductStats, getProductAnalysis };
