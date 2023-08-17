import mongoose, { mongo } from "mongoose";
//connect database
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};
