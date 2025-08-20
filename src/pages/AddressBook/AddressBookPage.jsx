import React from "react";
import AddressForm from "./AddressFormPage";
import { useNavigate } from "react-router-dom";
import useAddress from "@/hooks/useAddress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Pin } from "lucide-react";
import { toast } from "sonner";

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
                  <Pin className="mt-1 w-5 h-5" />
                  <div>
                    <p className="font-semibold">{address.street}</p>
                    <p className="text-sm">
                      {address.city}, {address.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate(`/address/edit/${address.id}`);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      deleteAddress(address.id);
                      toast.success("Address Deleted", {
                        duration: 3000,
                      });
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
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
