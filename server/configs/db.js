import mongoose from "mongoose";
require('dotenv').config();

let connectDB = async ()  => {
  try {
    await mongoose.connect(process.env.DB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    
    console.log("~ connectDB successfully");
  } catch (error) {
    console.log("~ connectDB error", error);
    process.exit(1);
  }
}

module.exports = connectDB;
