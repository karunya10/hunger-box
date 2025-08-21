import React, { useContext } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function CheckoutCards() {
  const navigate = useNavigate();
  const { savedCards, cardHandleChange, selectedCard } =
    useContext(CheckoutContext);
  return (
    <CardContent>
      <Card>
        <CardContent className="my-5">
          <div className="flex justify-between ">
            <div>
              <p className="mx-auto text-xl font-bold">Selected Card</p>
              {savedCards.length > 0 && (
                <div className="my-3">
                  <p className="text-sm">
                    Paying with {selectedCard.brand} {selectedCard.last4}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 items-end">
              <Button
                className="bg-red-400 hover:bg-red-500 text-white font-semibold py-1 sm:py-2 px-2 sm:px-4 transition text-xs sm:text-base w-32"
                onClick={cardHandleChange}
              >
                Change
              </Button>
              <Button
                className="bg-red-400 hover:bg-red-500 text-white font-semibold py-1 sm:py-2 px-2 sm:px-4 transition text-xs sm:text-base w-32"
                onClick={() => navigate("/wallet/new")}
              >
                Add Card
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </CardContent>
  );
}

export default CheckoutCards;
