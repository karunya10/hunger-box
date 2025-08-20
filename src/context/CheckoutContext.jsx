import { createContext, useState, useEffect } from "react";
import useAddress from "@/hooks/useAddress";
import { useCards } from "@/hooks/useCards";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

export const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const { addresses, loading } = useAddress();
  const [user] = useAuthState(auth);
  const { savedCards } = useCards(user);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [showCardsModal, setShowCardsModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");

  const addressHandleChange = () => {
    setShowAddressModal(true);
  };

  const onAddressSelect = (value) => {
    setSelectedAddress(value);
    setShowAddressModal(false);
  };

  const cardHandleChange = () => {
    setShowCardsModal(true);
  };

  const onCardSelect = (value) => {
    setSelectedCard(value);
    setShowCardsModal(false);
  };

  useEffect(() => {
    addresses.length && setSelectedAddress(addresses[0]);
    savedCards.length > 0 && setSelectedCard(savedCards[0]);
  }, [addresses, savedCards]);

  const value = {
    addresses,
    loading,
    showAddressModal,
    setShowAddressModal,
    selectedAddress,
    setSelectedAddress,
    addressHandleChange,
    onAddressSelect,
    savedCards,
    cardHandleChange,
    onCardSelect,
    selectedCard,
    showCardsModal,
    setShowCardsModal,
  };
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}
