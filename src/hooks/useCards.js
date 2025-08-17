import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import useFetch from "./useFetch";

export default function useCards() {
  const [user] = useAuthState(auth);
  const [cards, setCards] = useState([]);
  const { request, loading, error } = useFetch();

  useEffect(() => {
    if (user) {
      fetchCards();
    }
  }, [user]);

  const fetchCards = async () => {
    const token = await user.getIdToken();
    const response = await request({
      url: `/cards/${user.uid}.json?auth=${token}`,
    });
    const cardsArr = [];
    for (const key in response) {
      cardsArr.push({
        id: key,
        cardNumber: response[key].cardNumber,
        expiry: {
          month: response[key].expiry.month,
          year: response[key].expiry.year,
        },
        cvv: response[key].cvv,
      });
    }
    setCards(cardsArr);
  };

  const addCard = async (card) => {
    const token = await user.getIdToken();
    const response = await request({
      url: `/cards/${user.uid}.json?auth=${token}`,
      method: "POST",
      data: JSON.stringify({ ...card, uid: user.uid }),
      headers: { "Content-Type": "application/json" },
    });
    fetchCards();
  };

  const editCard = async (card, cardId) => {
    const token = await user.getIdToken();
    const response = await request({
      url: `/cards/${user.uid}/${cardId}.json?auth=${encodeURIComponent(
        token
      )}`,
      method: "PUT",
      data: JSON.stringify({ ...card, uid: user.uid }),
      headers: { "Content-Type": "application/json" },
    });
    fetchCards();
  };

  const deleteAddress = async (cardId) => {
    const token = await user.getIdToken();
    const response = await request({
      url: `/cards/${user.uid}/${cardId}.json?auth=${token}`,
      method: "DELETE",
    });
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
