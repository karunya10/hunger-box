import { useState, useEffect } from "react";
import useFetch from "./useFetch";

export default function useMenu(city, restaurantId) {
  const [menus, setMenus] = useState([]);
  const { request, loading, error } = useFetch();
  useEffect(() => {
    fetchMenus(city, restaurantId);
  }, [city, restaurantId]);

  const fetchMenus = async (city, restaurantId) => {
    const response = await request({
      url: `/menus/${city}/${restaurantId}.json`,
    });

    const menusArr = [];
    for (const key in response) {
      menusArr.push({
        id: key,
        name: response[key].name,
        category: response[key].category,
        price: response[key].price,
        storagePath: response[key].storagePath,
        isVeg: response[key].isVeg,
      });
    }
    setMenus(menusArr);
  };
  return {
    menus,
    loading,
    error,
  };
}
