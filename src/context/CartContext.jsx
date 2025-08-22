import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [currentRestaurantId, setCurrentRestaurantId] = useState("");
  const currentCart = cart[currentRestaurantId]
    ? cart[currentRestaurantId]
    : [];

  useEffect(() => {
    if (currentRestaurantId !== "" && !cart[currentRestaurantId]) {
      setCart({ ...cart, [currentRestaurantId]: [] });
    }
  }, [currentRestaurantId]);

  const totalPrice = () => {
    const price =
      currentCart &&
      currentCart.reduce((accu, oneItem) => {
        return accu + oneItem.price;
      }, 0);
    return price;
  };

  const cartSummary =
    currentCart &&
    currentCart.reduce((acc, item) => {
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

  const aggregateCart = currentCart && Object.values(cartSummary);

  const value = {
    cart,
    setCart,
    totalPrice,
    aggregateCart,
    cartSummary,
    currentRestaurantId,
    currentCart,
    setCurrentRestaurantId,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
