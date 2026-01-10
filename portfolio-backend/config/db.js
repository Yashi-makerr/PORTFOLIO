const mongoose = require('mongoose');

// YAHAN APNA REAL CONNECTION STRING DALO
// /portfolio wala part add kar sakti ho:
const MONGO_URI = "mongodb+srv://ykesarwani41_db_user:PUqtOfuBFi17dLTT@cluster0.ndbctps.mongodb.net/portfolio?appName=Cluster0";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // fatal error, app band
  }
}

module.exports = connectDB;
