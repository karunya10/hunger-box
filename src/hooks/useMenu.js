import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const API_URL =
  "https://food-delivery-da806-default-rtdb.europe-west1.firebasedatabase.app";

export default function useMenu(city, restaurantId) {
  const [menus, setMenus] = useState([]);
  const { data, request, loading, error } = useFetch({ API_URL });

  useEffect(() => {
    fetchMenus(city, restaurantId);
  }, [city, restaurantId]);

  useEffect(() => {
    const menusArr = [];
    for (const key in data) {
      menusArr.push({
        id: key,
        name: data[key].name,
        category: data[key].category,
        price: data[key].price,
        storagePath: data[key].storagePath,
        isVeg: data[key].isVeg,
      });
    }
    setMenus(menusArr);
  }, [data]);

  const fetchMenus = async (city, restaurantId) => {
    await request({
      url: `/menus/${city}/${restaurantId}.json`,
    });
  };
  
  return {
    menus,
    loading,
    error,
  };
}
