import Locations from "./Locations";
import Restaurants from "./Restaurants";
import { useContext } from "react";
import { LocationsContext } from "../../context/locationContext";

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
