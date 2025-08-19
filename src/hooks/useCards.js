import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";

loadStripe(import.meta.env.VITE_STRIPE_PK);

export function useCards(user) {
  const [clientSecret, setClientSecret] = useState("");
  console.log("🚀 ~ useCards ~ clientSecret:", clientSecret);
  const [savedCards, setSavedCards] = useState([]);
  console.log("🚀 ~ useCards ~ savedCards:", savedCards);
  const uid = user.uid;

  // 1. Call function to create SetupIntent
  async function startCardSave() {
    const res = await fetch("http://localhost:3001/api/create-setup-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, email: user.email }),
    });
    const { clientSecret } = await res.json();
    setClientSecret(clientSecret);
  }

  // 2. Confirm card from frontend
  async function saveCard(stripe, elements) {
    const { setupIntent, error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/cards",
      },
      redirect: "if_required",
    });
    if (error) {
      console.error("Stripe error:", error);
      return false;
    }

    await fetch("http://localhost:3001/api/store-payment-method", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid,
        paymentMethodId: setupIntent.payment_method,
        firebaseDbUrl:
          "https://food-delivery-da806-default-rtdb.europe-west1.firebasedatabase.app",
      }),
    });
    fetchCards();
    return true;
  }

  // 3. Fetch saved cards from Firebase DB (REST)
  async function fetchCards() {
    const res = await fetch(
      `https://food-delivery-da806-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/stripe/cards.json`
    );
    const data = await res.json();
    const cards = Object.entries(data || {}).map(([id, info]) => ({
      id,
      ...info,
    }));
    setSavedCards(cards);
  }

  // 4. Charge selected card
  async function payWithCard(paymentMethodId, amount) {
    const res = await fetch("http://localhost:3001/api/pay-with-saved-card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, paymentMethodId, amount }),
    });
    const result = await res.json();
    return result;
  }

  useEffect(() => {
    fetchCards();
  }, []);

  return {
    startCardSave,
    clientSecret,
    saveCard,
    savedCards,
    fetchCards,
    payWithCard,
  };
}
