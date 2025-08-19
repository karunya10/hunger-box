import { useState, useEffect } from "react";
import useFetch from "./useFetch";
const API_URL =
  "https://food-delivery-da806-default-rtdb.europe-west1.firebasedatabase.app";

function useRestaurants(city) {
  const [restaurants, setRestaurants] = useState([]);

  const { data, loading, error, request } = useFetch({ API_URL });

  useEffect(() => {
    const fetchRestaurants = async () => {
      await request({ url: `/locations/${city}.json` });
    };
    fetchRestaurants();
  }, [city]);

  useEffect(() => {
    const restaurantsArr = [];
    for (const key in data.restaurants) {
      restaurantsArr.push({
        id: key,
        name: data.restaurants[key].name,
        image:
          "https://food-delivery-da806.web.app/assets/" +
          data.restaurants[key].storagePath,
        rating: data.restaurants[key].avgRating,
        cuisines: data.restaurants[key].cuisines,
        isVeg: data.restaurants[key].isVeg,
        description: data.restaurants[key].description,
      });

      setRestaurants(restaurantsArr);
    }
  }, [data]);

  return { restaurants, loading, error };
}

export default useRestaurants;
