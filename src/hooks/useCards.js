import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
const API_URL = import.meta.env.VITE_DATABASE_URL;

export default function useCards() {
  const [user] = useAuthState(auth);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const token = await user.getIdToken();

      const response = await axios.get(
        `${API_URL}/cards/${user.uid}.json?auth=${token}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to Fetch Locations");
      }
      const cardsArr = [];
      for (const key in response.data) {
        cardsArr.push({
          id: key,
          cardNumber: response.data[key].cardNumber,
          expiry: {
            month: response.data[key].expiry.month,
            year: response.data[key].expiry.year,
          },
          cvv: response.data[key].cvv,
        });
      }
      setCards(cardsArr);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      fetchCards();
    }
  }, [user]);

  const addCard = async (card) => {
    const token = await user.getIdToken();
    const response = await fetch(
      `${API_URL}/cards/${user.uid}.json?auth=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...card, uid: user.uid }),
      }
    );
    if (!response.ok) throw new Error("Failed to add address.");
    fetchCards();
  };

  const editCard = async (card, cardId) => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(
        `${API_URL}/cards/${user.uid}/${cardId}.json?auth=${encodeURIComponent(
          token
        )}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...card, uid: user.uid }),
        }
      );
      if (!response.ok) throw new Error("Failed to add recipe.");
      fetchCards();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteAddress = async (cardId) => {
    const token = await user.getIdToken();
    const response = await fetch(
      `${API_URL}/cards/${user.uid}/${cardId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Failed to delete Address.");

    fetchCards();
  };

  return {
    fetchCards,
    addCard,
    editCard,
    deleteAddress,
    cards,
    loading,
    error,
  };
}
