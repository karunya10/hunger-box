import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";

loadStripe(import.meta.env.VITE_STRIPE_PK);

export function useCards(user) {
  const [clientSecret, setClientSecret] = useState("");
  const [savedCards, setSavedCards] = useState([]);
  const uid = user.uid;

  // 1. Call function to create SetupIntent
  async function startCardSave() {
    const res = await fetch(
      "https://<your-region>-<project>.cloudfunctions.net/api/create-setup-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, email: user.email }),
      }
    );
    const { clientSecret } = await res.json();
    setClientSecret(clientSecret);
  }

  // 2. Confirm card from frontend
  async function saveCard(stripe, elements) {
    const { setupIntent, error } = await stripe.confirmSetup({ elements });
    if (error) {
      console.error("Stripe error:", error);
      return false;
    }

    await fetch(
      "https://<your-region>-<project>.cloudfunctions.net/api/store-payment-method",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid,
          paymentMethodId: setupIntent.payment_method,
        }),
      }
    );

    return true;
  }

  // 3. Fetch saved cards from Firebase DB (REST)
  async function fetchCards() {
    const res = await fetch(
      `https://<project>.firebaseio.com/users/${uid}/stripe/cards.json`
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
    const res = await fetch(
      "https://<your-region>-<project>.cloudfunctions.net/api/pay-with-saved-card",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, paymentMethodId, amount }),
      }
    );
    const result = await res.json();
    return result;
  }

  return {
    startCardSave,
    clientSecret,
    saveCard,
    savedCards,
    fetchCards,
    payWithCard,
  };
}
