import { useState, useEffect } from "react";
import useFetch from "./useFetch";

function useRestaurants(city) {
  const [restaurants, setRestaurants] = useState([]);
  const { request, loading, error } = useFetch();

  useEffect(() => {
    fetchRestaurants();
  }, [city]);

  const fetchRestaurants = async () => {
    const response = await request({ url: `/locations/${city}.json` });
    const restaurantsArr = [];
    for (const key in response.restaurants) {
      restaurantsArr.push({
        id: key,
        name: response.restaurants[key].name,
        image:
          "https://food-delivery-da806.web.app/assets/" +
          response.restaurants[key].storagePath,
        rating: response.restaurants[key].avgRating,
        cuisines: response.restaurants[key].cuisines,
        isVeg: response.restaurants[key].isVeg,
        description: response.restaurants[key].description,
      });
    }
    setRestaurants(restaurantsArr);
  };

  return { restaurants, loading, error };
}

export default useRestaurants;
