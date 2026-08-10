import "./CheckoutCard.css";
import { PaystackButton } from "react-paystack";
import API, { getSessionId } from "../services/chatApi"
import { useState } from "react";
import { useRestaurant } from "../hooks/useRestaurant";


function CheckoutCard() {
    const [email, setEmail] = useState("");

    const { 
        currentOrder,
        checkout, 
        setCheckout,
        setCurrentOrder,
        orderHistory,
        setOrderHistory,
        setMessages,
    } = useRestaurant();

    if (!checkout) return null;

    const total = currentOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const componentProps = {
        email: email,
        amount: total * 100, // Paystack expects amount in kobo
        publicKey: publicKey,
        text: "Pay with Paystack",
        onSuccess: async (reference) => {
            try{
                await API.put("/orders/checkout", {
                    sessionId: getSessionId(),
                    paymentReference: reference.reference,
                });
            
                const placedOrder = {
                    id: Date.now(),
                    items: [...currentOrder],
                    total,
                    createdAt: new Date().toLocaleString(),
                    paymentReference: reference.reference,
                    status: "paid",
                };
                setOrderHistory((prev) => [...prev, placedOrder]);
                setCurrentOrder([]);
                setCheckout(false);
                setMessages((prev) => [...prev,
                    {
                     sender: "bot", 
                     text:`Payment successful!

                     Thank you for patronizing Chisom Restaurant.

                     Your order has been confirmed.

                     Select 1 to place another order.
                     Select 98 to view your order history.`
                    },
                ]);
            } catch (error) {
                console.error(error);
                alert("Payment succeeded but the database could not be updated.")
            }
        },

        onClose: () => {
          alert("Payment cancelled.");
        }
    };
    return (
        <div className="checkout-panel">
            <div className="checkout-card">
                <button
                 className="close-btn"
                 onClick={() => setCheckout(false)}> X 
                </button>

                <h2>Checkout</h2>

                <div className="checkout-items">
                    {currentOrder.map((item, index) => (
                        <div className="checkout-item" key={index}>
                            <span>{item.quantity} x {item.name}</span> 
                            <span>₦{item.price * item.quantity}</span>
                        </div>
                    ))}
                </div>

                <div className="checkout-total">
                    <strong>Total</strong>

                    <strong>₦{total}</strong>
                </div>

                <div className="email-section">
                    <label htmlFor="customer-email">
                        Email Address
                    </label>

                    <input 
                        id="customer-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />
                </div>

                <PaystackButton
                    className="pay-btn"
                    {...componentProps}
                    text={email ? "Pay with Paystack" : 
                        "Enter your email"
                    }
                    disabled={!email || !isValidEmail}
                />
            </div>
        </div>
    );
}

export default CheckoutCard;