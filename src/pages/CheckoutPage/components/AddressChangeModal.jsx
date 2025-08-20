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
function AddressChangeModal() {
  const {
    showAddressModal,
    setShowAddressModal,
    loading,
    onAddressSelect,
    selectedAddress,
    addresses,
  } = useContext(CheckoutContext);
  return (
    <Dialog open={showAddressModal} onOpenChange={setShowAddressModal}>
      <DialogContent className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
        <DialogHeader className="w-full">
          <DialogTitle className="w-full text-center">
            Select Another Address
          </DialogTitle>
        </DialogHeader>
        {!loading && (
          <Select onValueChange={onAddressSelect}>
            <SelectTrigger className="w-full max-w-xs sm:max-w-md md:max-w-lg truncate">
              <SelectValue
                placeholder={`${selectedAddress.street},${selectedAddress.houseNo},${selectedAddress.city},
                        ${selectedAddress.pincode},${selectedAddress.country}`}
                className="whitespace-normal break-words max-w-full"
              />
              <SelectContent className="w-full max-w-xs sm:max-w-md md:max-w-lg max-h-60 overflow-y-auto">
                {addresses.map((address) => {
                  return (
                    <SelectItem
                      key={address.id}
                      value={address}
                      className="break-words whitespace-normal w-full"
                    >
                      {address.street},{address.houseNo},{address.city},
                      {address.pincode},{address.country}
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

export default AddressChangeModal;
