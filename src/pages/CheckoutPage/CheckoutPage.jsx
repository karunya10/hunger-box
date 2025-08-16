import { Card } from "@/components/ui/card";
import CheckoutAddress from "./components/CheckoutAddress";
import CheckoutCards from "./components/CheckoutCards";
import OrderSummary from "./components/OrderSummary";
import AddressChangeModal from "./components/AddressChangeModal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function CheckOutPage() {
  const navigate = useNavigate();
  return (
    <>
      <Card className="mx-auto w-1/2 my-10">
        <h2 className="mx-auto text-xl font-bold">Checkout</h2>
        <CheckoutAddress />
        <CheckoutCards />
        <OrderSummary />
        <Button
          className="mx-auto w-1/2 bg-red-400 hover:bg-red-500 text-white font-semibold py-2 transition"
          onClick={() => navigate("/orderconfirmation")}
        >
          Place Order
        </Button>
      </Card>
      <AddressChangeModal />
    </>
  );
}

export default CheckOutPage;
