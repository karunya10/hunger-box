import React, { useContext } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function CheckoutCards() {
  const { savedCards, cardHandleChange } = useContext(CheckoutContext);

  const selectedCard = savedCards.length > 0 && savedCards[0];

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
            <Button
              className="bg-red-400 hover:bg-red-500 text-white font-semibold py-1 sm:py-2 px-2 sm:px-4 transition text-xs sm:text-base"
              onClick={cardHandleChange}
            >
              Change
            </Button>
          </div>
        </CardContent>
      </Card>
    </CardContent>
  );
}

export default CheckoutCards;
