import { Card } from "@/components/ui/card";
import CheckoutAddress from "./components/CheckoutAddress";
import CheckoutCards from "./components/CheckoutCards";
import OrderSummary from "./components/OrderSummary";
import AddressChangeModal from "./components/AddressChangeModal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CardsChangeModal from "./components/CardsChangeModal";
import { useCards } from "@/hooks/useCards";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { CheckoutContext } from "@/context/CheckoutContext";

function CheckOutPage() {
  const { totalPrice } = useContext(CartContext);
  const { selectedCard } = useContext(CheckoutContext);

  const [user] = useAuthState(auth);
  const { payWithCard } = useCards(user);

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    const result = await payWithCard(selectedCard.id, totalPrice());
    console.log("🚀 ~ handlePlaceOrder ~ result:", result);

    result.status == "succeeded"
      ? navigate("/orderconfirmation")
      : navigate("/orderRejection");
  };

  return (
    <>
      <Card className="mx-auto w-1/2 my-10">
        <h2 className="mx-auto text-xl font-bold">Checkout</h2>
        <CheckoutAddress />
        <CheckoutCards />
        <OrderSummary />
        <Button
          className="mx-auto w-1/2 bg-red-400 hover:bg-red-500 text-white font-semibold py-2 transition"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Card>
      <AddressChangeModal />
      <CardsChangeModal />
    </>
  );
}

export default CheckOutPage;
