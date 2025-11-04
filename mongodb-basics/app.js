const mongoose = require("mongoose");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("../config.json"));

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  isActive: { type: Boolean, default: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
  try {
    const user = await User.create({
      name: "Sam Winchester",
      age: 40,
      email: "sam.winchester@example.com",
      tags: ["hunter", "son"],
    });
    console.log("User saved to MongoDB", user);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

async function getUsers() {
  try {
    // const users = await User.find();
    // console.log("All users", users);

    // const activeUsers = await User.find({ isActive: true });
    // console.log("Active users", activeUsers);

    // const userById = await User.findById("6908be57158de69f930b88aa");
    // console.log("User by ID", userById);

    // const inactiveUsers = await User.find({ isActive: false });
    // console.log("Inactive users", inactiveUsers);

    const selectedFields = await User.find({
      isActive: true,
    }).select("name email -_id");
    console.log("Selected fields", selectedFields);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

// runQueryExamples();

getUsers();
