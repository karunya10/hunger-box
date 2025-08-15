import { useContext, useState, createContext } from "react";
import useRestaurants from "@/hooks/useRestaurants";
import { LocationsContext } from "./LocationContext";

export const RestaurantContext = createContext(null);

export function RestaurantProvider({ children }) {
  const { selectedLocation: location } = useContext(LocationsContext);

  const { restaurants, loading: loadingRestaurants } = useRestaurants(location);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const value = {
    restaurants,
    loadingRestaurants,
    filteredRestaurants,
    setFilteredRestaurants,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}
