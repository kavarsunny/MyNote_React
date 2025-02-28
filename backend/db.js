const mongoose = require("mongoose");

const connectToMongo = async () => {
  const mongoURI = "mongodb://localhost:27017/inotebook"; // Replace with your MongoDB URI

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectToMongo;
