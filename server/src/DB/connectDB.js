import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI);

    console.log("connected to db");
  } catch (error) {
    console.log("failed to connect to DB", error);
    process.exit(1);
  }
};

export default connectDB;
