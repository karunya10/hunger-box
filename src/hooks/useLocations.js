import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_DATABASE_URL;

function useLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/location_restaurant_ids.json?shallow=true`
      );
      if (response.status !== 200) {
        throw new Error("Failed to Fetch Locations");
      }
      const locationsArr = Object.keys(response.data);
      setLocations(locationsArr);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return { locations, loading, error };
}

export default useLocations;
