import { createContext, useState } from "react";
import useLocations from "@/hooks/useLocations";

export const LocationsContext = createContext(null);

export function LocationsProvider({ children }) {
  const { locations, loading: locationsLoading } = useLocations();
  const [selectedLocation, setSelectedLocation] = useState("chennai");

  const value = {
    locations,
    locationsLoading,
    selectedLocation,
    setSelectedLocation,
  };
  return (
    <LocationsContext.Provider value={value}>
      {children}
    </LocationsContext.Provider>
  );
}
