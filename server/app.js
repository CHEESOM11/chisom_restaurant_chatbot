import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/session", sessionRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
    res.send("Restaurant Chatbot API is running...");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

