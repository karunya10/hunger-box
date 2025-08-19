import { useEffect } from "react";
import useFetch from "./useFetch";
const API_URL =
  "https://food-delivery-da806-default-rtdb.europe-west1.firebasedatabase.app";

function useLocations() {
  // const [locations, setLocations] = useState([]);
  const { data: locations, request, loading, error } = useFetch({ API_URL });
  useEffect(() => {
    fetchLocations();
  }, []);
  const fetchLocations = async () => {
    await request({
      url: "/location_restaurant_ids.json?shallow=true",
    });
    // const locationsArr = Object.keys(response);
    // setLocations(locationsArr);
  };
  return { locations: Object.keys(locations), loading, error };
}

export default useLocations;
