import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_DATABASE_URL;

export default function useMenu(city, restaurantId) {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenus = async (city, restaurantId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/menus/${city}/${restaurantId}.json`
      );
      if (response.status !== 200) {
        throw new Error("Failed to Fetch Locations");
      }
      const menusArr = [];
      for (const key in response.data) {
        menusArr.push({
          id: key,
          name: response.data[key].name,
          category: response.data[key].category,
          price: response.data[key].price,
          storagePath: response.data[key].storagePath,
          isVeg: response.data[key].isVeg,
        });
      }
      setMenus(menusArr);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus(city, restaurantId);
  }, [city, restaurantId]);

  return {
    menus,
    loading,
    error,
  };
}
