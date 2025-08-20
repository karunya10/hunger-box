import { useEffect } from "react";
import useFetch from "./useFetch";
const API_URL = import.meta.env.VITE_DATABASE_URL;

function useLocations() {
  const { data: locations, request, loading, error } = useFetch({ API_URL });
  useEffect(() => {
    fetchLocations();
  }, []);
  const fetchLocations = async () => {
    await request({
      url: "/location_restaurant_ids.json?shallow=true",
    });
  };
  return { locations: Object.keys(locations), loading, error };
}

export default useLocations;
