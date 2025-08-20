import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart({ className = "" }) {
  const { currentCart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div
      className={`lg:mx-0 lg:sticky lg:top-6 lg:right-6 lg:h-fit lg:my-5 ${className}`}
    >
      <div className="mx-auto rounded-xl border p-4 shadow-md w-64">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1 text-sm text-red-500 font-semibold bg-red-100 px-2 py-1 rounded-full">
            <span>🛒</span>
            <span>{currentCart.length} items</span>
          </div>
          <span className="text-xs text-gray-400">incl. VAT</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-lg">₹ {totalPrice().toFixed(2)}</span>
        </div>
        <button
          className={`w-full rounded-lg font-semibold py-2 transition 
              ${
                currentCart.length === 0
                  ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                  : "bg-red-400 hover:bg-red-500 text-white cursor-pointer"
              }
            `}
          onClick={() => navigate("/checkout")}
          disabled={currentCart.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
