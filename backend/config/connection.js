import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_ROUTE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // console.log("MongoDB connected!!");
  } catch (error) {
    Promise.reject(error);
  }
};
