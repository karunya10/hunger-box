import React from "react";
import AddressForm from "./AddressForm";
import { useNavigate } from "react-router-dom";
import useAddress from "@/hooks/useAddress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pencil1Icon,
  TrashIcon,
  DrawingPinFilledIcon,
} from "@radix-ui/react-icons";

function AddressBookPage() {
  const navigate = useNavigate();
  const { addresses, loading, deleteAddress } = useAddress();
  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 space-y-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Address Book</h2>
          <Button
            className="bg-[#FF6B5E] hover:bg-[#ff5849] text-white"
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </Button>
        </div>

        {!loading &&
          addresses.map((address) => {
            return (
              <Card
                key={address.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-start gap-3">
                  <DrawingPinFilledIcon className="mt-1 w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">{address.street}</p>
                    <p className="text-muted-foreground text-sm">
                      {address.city}, {address.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      navigate(`/address/edit/${address.id}`);
                    }}
                  >
                    <Pencil1Icon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      deleteAddress(address.id);
                    }}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            );
          })}

        <Button
          className="w-full bg-[#FF6B5E] hover:bg-[#ff5849] text-white"
          onClick={() => {
            navigate("/address/new");
          }}
        >
          + Add New Address
        </Button>
      </div>
    </>
  );
}

export default AddressBookPage;
