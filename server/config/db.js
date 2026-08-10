import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        console.log("Retrying MongoDB connection...");
        setTimeout(connectDB, 5000); // Retry after 5 seconds
    }
};

export default connectDB;