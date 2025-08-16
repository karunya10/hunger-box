import { createContext, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const totalPrice = cart.reduce((accu, oneItem) => {
    return accu + oneItem.price;
  }, 0);
  const cartSummary = cart.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = {
        name: item.name,
        count: 0,
        totalPrice: 0,
      };
    }
    acc[item.id].count += 1;
    acc[item.id].totalPrice += item.price;
    return acc;
  }, {});

  const aggregateCart = Object.values(cartSummary);
  const value = {
    cart,
    setCart,
    totalPrice,
    aggregateCart,
    cartSummary,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
