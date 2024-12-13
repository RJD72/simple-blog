const mongoose = require("mongoose");

async function connectDB() {
  try {
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    connection.on("error", () => {
      console.log("Something went wrong");
    });

    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

module.exports = connectDB;
