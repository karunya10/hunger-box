import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

loadStripe(import.meta.env.VITE_STRIPE_PK);

const PAYMENT_BACKEND = import.meta.env.PAYMENT_BACKEND;
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

export function useCards(user) {
  const [clientSecret, setClientSecret] = useState("");
  const [cId, setcId] = useState("");

  const [savedCards, setSavedCards] = useState([]);

  const uid = user.uid;

  useEffect(() => {
    const fetchStripeId = async () => {
      const res = await fetch(
        `https://food-delivery-da806-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/stripe/user.json`
      );
      const { stripeId } = await res.json();
      stripeId && setcId(stripeId);
    };
    fetchStripeId();
  }, []);

  // 1. Call function to create SetupIntent
  async function startCardSave() {
    const res = await fetch(`${PAYMENT_BACKEND}/api/create-setup-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid,
        email: user.email,
        firebaseDbUrl: `${DATABASE_URL}`,
      }),
    });
    const { clientSecret, stripeId } = await res.json();
    setClientSecret(clientSecret);
    cId.length == 0 && setcId(stripeId);
  }

  // 2. Confirm card from frontend
  async function saveCard(stripe, elements) {
    const { setupIntent, error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/wallet",
      },
      redirect: "if_required",
    });
    if (error) {
      console.error("Stripe error:", error);
      return false;
    }

    await fetch(`${PAYMENT_BACKEND}/api/store-payment-method`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid,
        paymentMethodId: setupIntent.payment_method,
        firebaseDbUrl: `${DATABASE_URL}`,
      }),
    });
    fetchCards();
    return true;
  }

  // 3. Delete card
  async function deleteCard(cardId) {
    await fetch(`${PAYMENT_BACKEND}/api/delete-card`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid,
        paymentMethodId: cardId,
        firebaseDbUrl: `${DATABASE_URL}`,
      }),
    });
    fetchCards();
  }

  // 4. Fetch saved cards from Firebase DB (REST)
  async function fetchCards() {
    const res = await fetch(`${DATABASE_URL}/users/${uid}/stripe/cards.json`);
    const data = await res.json();
    const cards = Object.entries(data || {}).map(([id, info]) => ({
      id,
      ...info,
    }));
    setSavedCards(cards);
  }

  // 5. Charge selected card
  async function payWithCard(paymentMethodId, amount) {
    const res = await fetch(`${PAYMENT_BACKEND}/api/pay-with-saved-card`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: cId, paymentMethodId, amount }),
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
    deleteCard,
    cId,
  };
}
