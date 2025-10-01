const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected...");
  } catch (err) {  // ✅ add err here
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // optional: stop app if DB fails
  }
};


module.exports = connectDB;