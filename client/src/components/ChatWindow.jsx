import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import API, { getSessionId } from "../services/chatApi";
import { useRestaurant } from "../hooks/useRestaurant";

function ChatWindow() {
  const [input, setInput] = useState("");
  const {
    messages,
    setMessages,
    currentOrder,
    setCurrentOrder,
    orderHistory,
    setOrderHistory,
    checkout,
    setCheckout,
    botState,
    setBotState,
    typing,
    setTyping,
  } = useRestaurant();

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: `👋 Welcome to Chisom Restaurant!
                    
                    Select an option
                    
                    1 - Place an Order
                    
                    97 - Current Order
                    
                    98 - Order History
                    
                    99 - Checkout
                    
                    0 - Cancel Order`,
      },
    ]);
  }, [setMessages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userInput = input.trim();

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userInput },
    ]);
    setInput("");
    setTyping(true);

    setTimeout(async () => {
      const { data: bot } = await API.post("/chat", {
        message: userInput,
        state: botState,
      });
      let updatedOrder = currentOrder;

      if (bot.action === "ADD_TO_ORDER") {
        const nextOrder = (prevOrder) => {
          const existingItem = prevOrder.find(
            (item) => item.name === bot.item.name,
          );
          if (existingItem) {
            return prevOrder.map((item) =>
              item.name === bot.item.name
                ? { ...item, quantity: item.quantity + bot.quantity }
                : item,
            );
          }
          return [...prevOrder, { ...bot.item, quantity: bot.quantity }];
        };

        setCurrentOrder(nextOrder);
        updatedOrder = nextOrder(currentOrder);

        await API.post("/orders", {
          sessionId: getSessionId(),
          item: bot.item,
          quantity: bot.quantity,
        });
      }

      if (bot.action === "VIEW_CURRENT_ORDER") {
        try {
          const { data: order } = await API.get(
            `/orders/current/${getSessionId()}`,
          );

          if (!order.items || order.items.length === 0) {
            bot.reply = "Your current order is empty.";
          } else {
            let orderText = "Current Order\n\n";

            order.items.forEach((item) => {
              orderText += `${item.quantity} x ${item.name} - ₦${item.price * item.quantity}\n`;
            });

            orderText += `\nTotal: ₦${order.total}`;

            bot.reply = orderText;

            // Keep the right-side panel in sync with MongoDB
            setCurrentOrder(order.items);
          }
        } catch (error) {
          console.error(error);
          bot.reply = "Unable to retrieve your current order.";
        }
      }

      if (bot.action === "CANCEL_ORDER") {
        setCurrentOrder([]);
        updatedOrder = [];

        bot.reply = "Your current order has been cancelled.";
      }

      if (bot.action === "CHECKOUT") {
        if (updatedOrder.length === 0) {
          bot.reply = "No order to place.";
        } else {
          setCheckout(true);
          bot.reply = ` Opening secure checkout...
           
            You're now directed to the payment page. `;
        }
      }

      if (bot.action === "VIEW_ORDER_HISTORY") {
        try {
          const { data: orders } = await API.get(
            `/orders/history/${getSessionId()}`
          );

          if (orders.length === 0) {
            bot.reply = "You have no previous orders.";
          } else {
            let historyText = " Order History\n\n";

            orders.forEach((order, index) => {
              historyText += `Order #${index + 1}\n`;
            });

            order.items.forEach((item) => {
              historyText += `${item.quantity} x ${item.name} - ₦${item.price * item.quantity}\n`;
            });

            historyText += `Total: ₦${order.total}\n`;

            bot.reply = historyText;

            setOrderHistory(orders);
          }
        } catch (error) {
          console.error(error);

          bot.reply = "Unable to load your order history.";
        }
            
      }

      setTyping(false);

      setBotState(bot.nextState);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: bot.reply },
      ]);
    }, 800);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>🍽️ Chat with our Restaurant Bot </h2>
        <p>🟢 Online</p>
      </div>

      <div className="messages">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            sender={message.sender}
            text={message.text}
          />
        ))}

        {typing && <ChatMessage sender="bot" text="..." />}
      </div>

      <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
    </div>
  );
}

export default ChatWindow;
