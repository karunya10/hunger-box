import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pin, Trash2 } from "lucide-react";
import { useCards } from "@/hooks/useCards";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

import { toast } from "sonner";

function CardsListPage() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { savedCards, deleteCard } = useCards(user);

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 space-y-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Wallet</h2>
          <Button
            className="bg-[#FF6B5E] hover:bg-[#ff5849] text-white"
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </Button>
        </div>

        {savedCards.length > 0 &&
          savedCards.map((card) => {
            return (
              <Card
                key={card.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-start gap-3">
                  <Pin className="mt-1 w-5 h-5" />
                  <div>
                    <p className="font-semibold">{card.brand}</p>
                    <p className="text-sm">
                      {card.expMonth}, {card.expYear}
                    </p>
                    <p>Last Four Digits:{card.last4}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3"></div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    deleteCard(card.id);
                    toast.success("Address Deleted", {
                      duration: 3000,
                    });
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </Card>
            );
          })}

        <Button
          className="w-full bg-[#FF6B5E] hover:bg-[#ff5849] text-white"
          onClick={() => {
            navigate("/wallet/new");
          }}
        >
          + Add New Card
        </Button>
      </div>
    </>
  );
}

export default CardsListPage;
