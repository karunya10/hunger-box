import { useState, useEffect } from "react";
import useFetch from "./useFetch";

function useLocations() {
  const [locations, setLocations] = useState([]);
  const { request, loading, error } = useFetch();
  useEffect(() => {
    fetchLocations();
  }, []);
  const fetchLocations = async () => {
    const response = await request({
      url: "/location_restaurant_ids.json?shallow=true",
    });
    const locationsArr = Object.keys(response);
    setLocations(locationsArr);
  };
  return { locations, loading, error };
}

export default useLocations;
