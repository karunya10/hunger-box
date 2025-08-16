import { createContext, useState, useEffect } from "react";
import useAddress from "@/hooks/useAddress";

export const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const { addresses, loading } = useAddress();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleChange = () => {
    setShowAddressModal(true);
  };
  const onAddressSelect = (value) => {
    setSelectedAddress(value);
    setShowAddressModal(false);
  };

  useEffect(() => {
    addresses.length && setSelectedAddress(addresses[0]);
  }, [addresses]);

  const value = {
    addresses,
    loading,
    showAddressModal,
    setShowAddressModal,
    selectedAddress,
    setSelectedAddress,
    handleChange,
    onAddressSelect,
  };
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}
