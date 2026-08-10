import { createContext, useState } from "react";

export const RestaurantContext = createContext();

export function RestaurantProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [botState, setBotState] = useState("MAIN_MENU");
  const [typing, setTyping] = useState(false);
  const [checkout, setCheckout] = useState(false);

  return (
    <RestaurantContext.Provider
      value={{
        messages,
        setMessages,
        currentOrder,
        setCurrentOrder,
        selectedItem,
        setSelectedItem,
        orderHistory,
        setOrderHistory,
        botState,
        setBotState,
        typing,
        setTyping,
        checkout,
        setCheckout,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}
