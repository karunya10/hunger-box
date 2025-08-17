import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

function OrderSummary() {
  const { currentCart, totalPrice, aggregateCart } = useContext(CartContext);

  return (
    <CardContent>
      <Card className="w-full rounded-xl border p-4 shadow-sm">
        <CardContent className="space-y-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="space-y-2">
            {currentCart.length > 0 &&
              aggregateCart.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.name.slice(0, 40)}...
                    <span className="text-gray-500"> x {item.count}</span>
                  </span>
                  <span className="text-right">
                    ₹ {item.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
          </div>
          <hr className="my-2" />
          <div className="space-y-1 text-sm">
            <div className="flex justify-between font-semibold text-red-500 pt-1">
              <span>Total</span>
              <span> ₹ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </CardContent>
  );
}

export default OrderSummary;
