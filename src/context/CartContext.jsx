import { createContext, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const totalPrice = cart.reduce((accu, oneItem) => {
    return accu + oneItem.price;
  }, 0);
  const value = {
    cart,
    setCart,
    totalPrice
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
