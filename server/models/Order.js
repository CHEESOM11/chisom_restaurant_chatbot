import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
        },

        items: [
            {
                name: String,
                quantity: Number,
                price: Number,
            },
        ],

        total: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "paid", "cancelled"],
            default: "pending",
        },

        paymentReference: {
            type: String,
            default: "",
        },
    },

    {
        timestamps: true,
    }
);

export default mongoose.model("Order", orderSchema);