import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const connectDB = () => {
  try {
    if (!MONGO_URI) {
      throw new Error("Please provide MONGO_URI in the environment variables");
    }
    mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
