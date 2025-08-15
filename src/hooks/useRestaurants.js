// import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
// import { auth } from "../config/firebase";
import axios from "axios";

const API_URL = import.meta.env.VITE_DATABASE_URL;

function useRestaurants(city) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/locations/${city}.json`);
      if (response.status !== 200) {
        throw new Error("Failed to Fetch Restaurants");
      }
      const restaurantsArr = [];
      for (const key in response.data.restaurants) {
        restaurantsArr.push({
          id: key,
          name: response.data.restaurants[key].name,
          image:
            "https://food-delivery-da806.web.app/assets/" +
            response.data.restaurants[key].storagePath,
          rating: response.data.restaurants[key].avgRating,
          cuisines: response.data.restaurants[key].cuisines,
          //   uid: response.data[key].uid,
        });
      }
      setRestaurants(restaurantsArr);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [city]);

  return { restaurants, loading, error };
}

export default useRestaurants;
