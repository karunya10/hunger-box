import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";

function SaveCardForm({ saveCard, setSaving, saving, setMessage }) {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const success = await saveCard(stripe, elements);
    setSaving(false);

    if (success) {
      setMessage("Card saved successfully 🎉");
      navigate(-1);
    } else {
      setMessage("Failed to save card 😢");
      navigate(-1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || !elements || saving}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      >
        {saving ? "Saving..." : "Save Card"}
      </button>
    </form>
  );
}

export default SaveCardForm;
