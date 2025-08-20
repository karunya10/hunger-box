import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCards } from "@/hooks/useCards";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import SaveCardForm from "./SaveCardForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function CardsBook() {
  const [user] = useAuthState(auth);
  const { startCardSave, clientSecret, saveCard } = useCards(user);
  const [saving, setSaving] = useState(false);
  // const [message, setMessage] = useState("");

  useEffect(() => {
    startCardSave();
  }, []);

  if (!clientSecret) {
    return <p className="text-center">Loading Stripe...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 shadow-md rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">💳 Save Your Card</h2>

      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <SaveCardForm
          saveCard={saveCard}
          setSaving={setSaving}
          saving={saving}
        />
      </Elements>

      {/* {message && (
        <p className="text-center mt-4 text-green-600 font-semibold">
          {message}
        </p>
      )} */}
    </div>
  );
}
