import useLocations from "@/hooks/useLocations";
import { Button } from "@/components/ui/button";
import RestaurantCard from "@/pages/HomePage/RestaurantCard";
import Locations from "./Locations";
import Restaurants from "./Restaurants";
import { useState } from "react";

function HomePage() {
  const { locations, loading: locationsLoading } = useLocations();
  const [selectedLocation, setSelectedLocation] = useState("chennai");
  return (
    <>
      <main className="m-20">
        <Locations
          locations={locations}
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
        />
        {!locationsLoading && <Restaurants location={selectedLocation} />}
      </main>
    </>
  );
}

export default HomePage;
