import { useState } from "react";
import useRestaurants from "@/hooks/useRestaurants";
import RestaurantCard from "./RestaurantCard";
import SearchInput from "./SearchInput";
function Restaurants({ location }) {
  const { restaurants, loading } = useRestaurants(location);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <>
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search restaurants..."
        />
        {!loading && (
          <div className="grid grid-cols-4 gap-6">
            {restaurants.map((restaurant) => {
              const { id, image, name, rating, cuisines } = restaurant;
              return (
                <RestaurantCard
                  key={id}
                  image={image}
                  name={name}
                  cuisines={cuisines}
                  rating={rating}
                />
              );
            })}
          </div>
        )}
      </>
    </div>
  );
}

export default Restaurants;
