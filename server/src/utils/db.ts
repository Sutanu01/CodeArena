import mongoose from "mongoose";


export const connectToDatabase = async () => {
  try {
    const data = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`Connected to MongoDB to ${data.connection.host}:${data.connection.port}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};