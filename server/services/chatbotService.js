const menu = {
  1: { name: "Jollof Rice", price: 3000 },
  2: { name: "Fried Rice", price: 2500 },
  3: { name: "Pounded Yam and Soup", price: 2000 },
  4: { name: "Eba and Soup", price: 1500 },
  5: { name: "Chicken", price: 2000 },
  6: { name: "Fish", price: 1500 },
  7: { name: "Turkey", price: 2500 },
  8: { name: "Goat Meat", price: 3000 },
  9: { name: "Water", price: 300 },
  10: { name: "Soft Drink", price: 700 },
};

let selectedItem = null;

export function getBotResponse(message, state) {
  const command = message.trim();

  if (state === "MAIN_MENU") {
    switch (command) {
      case "1":
        return {
          reply: `MENU

1. Jollof Rice - ₦3000
2. Fried Rice - ₦2500
3. Pounded Yam and Soup - ₦2000
4. Eba and Soup - ₦1500
5. Chicken - ₦2000
6. Fish - ₦1500
7. Turkey - ₦2500
8. Goat Meat - ₦3000
9. Water - ₦300
10. Soft Drink - ₦700

Reply with the number of the item you'd like to order.`,
          nextState: "SELECTING_ITEM",
        };

      case "97":
        return {
          action: "VIEW_CURRENT_ORDER",
          nextState: "MAIN_MENU",
        };

      case "98":
        return {
          action: "VIEW_ORDER_HISTORY",
          nextState: "MAIN_MENU",
        };

      case "99":
        return {
          action: "CHECKOUT",
          nextState: "MAIN_MENU",
        };

      case "0":
        return {
          action: "CANCEL_ORDER",
          nextState: "MAIN_MENU",
        };

      default:
        return {
          reply: "Invalid option.",
          nextState: "MAIN_MENU",
        };
    }
  }

  if (state === "SELECTING_ITEM") {
    if (command === "97") {
      return {
        action: "VIEW_CURRENT_ORDER",
        nextState: "SELECTING_ITEM",
      };
    }

    if (command === "98") {
      return {
        action: "VIEW_ORDER_HISTORY",
        nextState: "SELECTING_ITEM",
      };
    }

    if (command === "99") {
      return {
        action: "CHECKOUT",
        nextState: "SELECTING_ITEM",
      };
    }

    if (command === "0") {
      return {
        action: "CANCEL_ORDER",
        nextState: "MAIN_MENU",
      };
    }

    if (menu[command]) {
      selectedItem = menu[command];

      return {
        reply: `How many ${selectedItem.name} would you like?`,
        nextState: "ENTERING_QUANTITY",
      };
    }

    return {
      reply: "Invalid item number. Please select a valid item from the menu.",
      nextState: "SELECTING_ITEM",
    };
  }

  if (state === "ENTERING_QUANTITY") {
    const quantity = Number(command);

    if (selectedItem && Number.isInteger(quantity) && quantity > 0) {
      const item = selectedItem;

      // Clear the temporary selection after use
      selectedItem = null;

      return {
        action: "ADD_TO_ORDER",
        item,
        quantity,
        reply: `Added ${quantity} x ${item.name} to your order.

MENU

1. Jollof Rice - ₦3000
2. Fried Rice - ₦2500
3. Pounded Yam and Soup - ₦2000
4. Eba and Soup - ₦1500
5. Chicken - ₦2000
6. Fish - ₦1500
7. Turkey - ₦2500
8. Goat Meat - ₦3000
9. Water - ₦300
10. Soft Drink - ₦700

Reply with another menu number.

97 - View Current Order
99 - Checkout
0 - Cancel Order`,
        nextState: "SELECTING_ITEM",
      };
    }

    return {
      reply: "Please enter a valid quantity.",
      nextState: "ENTERING_QUANTITY",
    };
  }

  return {
    reply: "Invalid state.",
    nextState: "MAIN_MENU",
  };
}

export { menu };