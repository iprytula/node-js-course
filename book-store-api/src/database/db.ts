import mongoose from "mongoose";

const connectToDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDB;