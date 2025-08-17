import React, { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useNavigate, useParams } from "react-router-dom";

function Cart() {
  const { restaurantId } = useParams();

  const { cart, currentCart, totalPrice, setCurrentRestaurantId } =
    useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentRestaurantId(restaurantId);
  }, []);

  if (!cart[restaurantId]) {
    setCurrentRestaurantId(restaurantId);
    return;
  }
  return (
    <div className="sticky top-6 right-6 h-fit my-5">
      <div className="rounded-xl border p-4 shadow-md w-64">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1 text-sm text-red-500 font-semibold bg-red-100 px-2 py-1 rounded-full">
            <span>🛒</span>
            <span>{currentCart.length} items</span>
          </div>
          <span className="text-xs text-gray-400">incl. VAT</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-lg">₹ {totalPrice}</span>
        </div>
        <button
          className="w-full rounded-lg bg-red-400 hover:bg-red-500 text-white font-semibold py-2 transition"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
