import Locations from "./components/Location/Locations";
import Restaurants from "./components/Restaurants/Restaurants";
import { useContext } from "react";
import { LocationsContext } from "@/context/LocationContext";

function HomePage() {
  const { locationsLoading } = useContext(LocationsContext);
  return (
    <>
      <main className="m-20">
        <Locations />
        {!locationsLoading && <Restaurants />}
      </main>
    </>
  );
}

export default HomePage;
