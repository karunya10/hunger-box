import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";
function CheckoutAddress() {
  const { loading, selectedAddress, handleChange } = useContext(CheckoutContext);
  return (
    <CardContent>
      <Card>
        <CardContent className="my-5">
          <div className="flex justify-between ">
            <div>
              <p className="mx-auto text-xl font-bold">Delivery Address</p>
              {!loading && (
                <div className="my-3">
                  <p>
                    {selectedAddress.street} {selectedAddress.houseNo},
                  </p>
                  <p>
                    {selectedAddress.city},{selectedAddress.pincode},
                  </p>
                  <p> {selectedAddress.phone}</p>
                </div>
              )}
            </div>
            <Button
              className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 transition"
              onClick={handleChange}
            >
              Change
            </Button>
          </div>
        </CardContent>
      </Card>
    </CardContent>
  );
}

export default CheckoutAddress;
