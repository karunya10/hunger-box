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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Another Address</DialogTitle>
        </DialogHeader>
        {!loading && (
          <Select onValueChange={onAddressSelect}>
            <SelectTrigger className="w-[400px]">
              <SelectValue
                placeholder={`${selectedAddress.street},${selectedAddress.houseNo},${selectedAddress.city},
                        ${selectedAddress.pincode},${selectedAddress.country}`}
              />
              <SelectContent>
                {addresses.map((address) => {
                  return (
                    <SelectItem key={address.id} value={address}>
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
