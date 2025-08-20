import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function OrderConfirmationPage() {
  const navigate = useNavigate();
  return (
    <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto my-10 px-2">
      <CardContent className="mx-auto">
        <CircleCheckBig size={120} className="text-green-500 mx-auto my-6" />
        <CardTitle className="py-4 text-center text-lg sm:text-2xl">
          Order Placed Successfully
        </CardTitle>
        <CardDescription className="py-4 text-center text-sm sm:text-base">
          Your order has been confirmed and is being prepared
        </CardDescription>
      </CardContent>
      <Button
        className="block mx-auto w-full sm:w-1/2 bg-red-400 hover:bg-red-500 text-white font-semibold py-2 transition"
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </Card>
  );
}

export default OrderConfirmationPage;
