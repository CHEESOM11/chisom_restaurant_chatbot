import { useEffect } from "react";
import API, { getSessionId } from "../services/chatApi";
import { useRestaurant } from "../hooks/useRestaurant";

function OrderHistory() {
  const { orderHistory, setOrderHistory } = useRestaurant();
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const { data } = await API.get(`/orders/history/${getSessionId()}`);
        setOrderHistory(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadHistory();
  }, []);

  return (
    <div
      style={{
        background: "white",
        margin: "15px",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
        minHeight: "300px",
      }}
    >
      <h3>📜 Order History</h3>

      {orderHistory.length === 0 ? (
        <p style={{ color: "#777" }}>No previous orders.</p>
      ) : (
        orderHistory.map((order, index) => (
          <div
            key={order._id || index}
            style={{
              background: "#f8f9fa",
              borderRadius: "10px",
              padding: "12px",
              marginTop: "15px",
              borderLeft: "5px solid #28a745",
            }}
          >
            <h4>Order #{index + 1}</h4>

            {order.items.map((item, i) => (
              <p key={i}>
                {item.quantity} x {item.name} — ₦{item.price * item.quantity}
              </p>
            ))}

            <hr />

            <strong>Total: ₦{order.total}</strong>

            <br />

            <span
              style={{
                color: order.status === "paid" ? "green" : "orange",
                fontWeight: "bold",
              }}
            >
              {order.status.toUpperCase()}
            </span>

            <br />

            <small>{new Date(order.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
