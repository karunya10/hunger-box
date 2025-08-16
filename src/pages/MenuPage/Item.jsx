import { Card, CardContent } from "@/components/ui/card";
import { CartContext } from "@/context/CartContext";
import { useState, useContext, useEffect } from "react";
function Item({ menu }) {
  const [quantity, setQuantity] = useState(0);
  const { setCart, cart, cartSummary, aggregateCart } = useContext(CartContext);
  console.log("🚀 ~ Item ~ summary:", cartSummary);

  const removeItem = () => {
    const index = cart.findIndex((oneItem) => {
      return oneItem.id === menu.id;
    });
    if (index != -1) {
      setCart((prev) => {
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    }
  };

  const handleDecrease = () => {
    if (quantity !== 0) {
      setQuantity((prev) => prev - 1);
      removeItem();
    }
  };
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    setCart((prev) => [...prev, menu]);
  };

  useEffect(() => {
    aggregateCart.length > 0 &&
      cartSummary[menu.id] &&
      setQuantity(cartSummary[menu.id].count);
  }, [cartSummary]);

  return (
    <Card key={menu.id}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <div className="font-semibold text-lg">{menu.name}</div>
        </div>
        <div className="text-right">
          <div className="font-semibold text-red-500">
            ₹{menu.price.toFixed(2)}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button className="border px-2 rounded" onClick={handleDecrease}>
              -
            </button>
            <span>{quantity}</span>
            <button className="border px-2 rounded" onClick={handleIncrease}>
              +
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Item;
