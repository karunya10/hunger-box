import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";
function CardsChangeModal() {
  const {
    savedCards,
    onCardSelect,
    selectedCard,
    showCardsModal,
    setShowCardsModal,
  } = useContext(CheckoutContext);
  return (
    <Dialog open={showCardsModal} onOpenChange={setShowCardsModal}>
      <DialogContent className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
        <DialogHeader className="w-full">
          <DialogTitle className="w-full text-center">
            Select Another Card
          </DialogTitle>
        </DialogHeader>
        {savedCards.length > 0 && (
          <Select onValueChange={onCardSelect}>
            <SelectTrigger className="w-full max-w-xs sm:max-w-md md:max-w-lg truncate">
              <SelectValue
                placeholder={`${selectedCard.brand},
                ${selectedCard.expMonth}/${selectedCard.expYear},
                        ${selectedCard.last4},`}
              />
              <SelectContent className="w-full max-w-xs sm:max-w-md md:max-w-lg max-h-60 overflow-y-auto">
                {savedCards.map((card) => {
                  return (
                    <SelectItem key={card.id} value={card}>
                      {card.brand}, {card.expMonth}/{card.expYear},{card.last4}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </SelectTrigger>
          </Select>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CardsChangeModal;
