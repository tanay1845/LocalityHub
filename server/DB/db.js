import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected")
    } catch (error) {
        console.log("Failed to connect MongoDB")
        console.log(error)
    }
}