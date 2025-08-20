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
    <Card className="w-1/2 mx-auto my-50">
      <CardContent className="mx-auto">
        <CircleCheckBig size={200} className="text-green-500 mx-auto " />
        <CardTitle className="py-4 text-center">
          {" "}
          Order Placed Successfully
        </CardTitle>
        <CardDescription className="py-4">
          Your order has been confirmed and is being prepared
        </CardDescription>
      </CardContent>
      <Button
        className="w-1/2 mx-auto bg-red-400 hover:bg-red-500 text-white font-semibold py-2 transition"
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </Card>
  );
}

export default OrderConfirmationPage;
