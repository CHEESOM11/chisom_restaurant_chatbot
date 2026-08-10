import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
    try {
        const { sessionId, item, quantity } = req.body;

        let order =await Order.findOne({
            sessionId,
            status: "pending",
        });

        if (!order) {
            order = new Order({
                sessionId,
                items: [],
                total: 0,
            });
        }

        const existingItem = order.items.find(
            (i) => i.name === item.name
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            order.items.push({
                name: item.name,
                price:item.price,
                quantity,
            });
        }

        order.total = order.items.reduce((sum, item) => sum + item.price * item.quantity,
            0
        );

        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getCurrentOrder = async (req, res)=>{
    try {
        const { sessionId } = req.params;

        const order = await Order.findOne({
            sessionId,
            status: "pending",
        });

        if (!order) {
            return res.json({
                items: [],
                total: 0,
            });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
export const getOrderHistory = async (req, res)=>{
    try {
        const { sessionId } = req.params;

        const orders = await Order.find({
            sessionId,
            status: "paid",
        }).sort({ created: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
export const checkoutOrder = async (req, res)=>{
    try {
        const { sessionId, paymentReference } = req.body;

        if (!sessionId || !paymentReference) {
            return res.status(400).json({
                message: "Session ID and payment reference are required."
            });
        }

        //Verify payment with Paystack
        const response = await fetch(`https://api.paystack.co/transaction/verify/${paymentReference}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        });
        
        const paymentData = await response.json();

        if (!response.ok || !paymentData.status || paymentData.data.status !== "success") {
            return res.status(400).json({
                message: "Payment verification failed."
            });
        }

        const order = await Order.findOne({
            sessionId,
            status: "pending",
        });

        if (!order) {
            return res.status(404).json({
                message: "No pending order found."
            });
        }

        //Verify amount paid
        const expectedAmount = order.total * 100; // Convert to kobo
        if (paymentData.data.amount !== expectedAmount) {
            return res.status(400).json({
                message: "Payment amount does not match order total."
            });
        }

        order.status = "paid";
        order.paymentReference = paymentReference;

        await order.save();

        res.json({
            message: "Order checked out successfully.",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};