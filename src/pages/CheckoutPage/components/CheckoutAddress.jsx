import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";
import { useNavigate } from "react-router-dom";
function CheckoutAddress() {
  const navigate = useNavigate();
  const { loading, selectedAddress, addressHandleChange } =
    useContext(CheckoutContext);
  return (
    <CardContent>
      <Card>
        <CardContent className="my-5">
          <div className="flex justify-between ">
            <div>
              <p className="mx-auto text-xl font-bold">Delivery Address</p>
              {!loading &&
                (selectedAddress ? (
                  <div className="my-3">
                    <p>
                      {selectedAddress.street} {selectedAddress.houseNo},
                    </p>
                    <p>
                      {selectedAddress.city},{selectedAddress.pincode},
                    </p>
                    <p> {selectedAddress.phone}</p>
                  </div>
                ) : (
                  <div className="my-3 text-red-500">No address available</div>
                ))}
            </div>
            <div className="flex flex-col gap-3 items-end">
              <Button
                className="bg-red-400 hover:bg-red-500 text-white font-semibold py-1 sm:py-2 px-2 sm:px-4 transition text-xs sm:text-base w-32"
                onClick={addressHandleChange}
              >
                Change
              </Button>
              <Button
                className="bg-red-400 hover:bg-red-500 text-white font-semibold py-1 sm:py-2 px-2 sm:px-4 transition text-xs sm:text-base w-32"
                onClick={() => navigate("/address/new")}
              >
                Add Address
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </CardContent>
  );
}

export default CheckoutAddress;
