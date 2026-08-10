import express from "express";
import { 
    createOrder,
    getCurrentOrder,
    getOrderHistory,
    checkoutOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);

//Gets the current pending order for a session
router.get("/current/:sessionId", getCurrentOrder);

router.get("/history/:sessionId", getOrderHistory);

router.put("/checkout", checkoutOrder);

export default router;