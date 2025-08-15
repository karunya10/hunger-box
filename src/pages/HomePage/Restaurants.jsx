import { useState } from "react";
import useRestaurants from "@/hooks/useRestaurants";
import RestaurantCard from "./RestaurantCard";
import FilterBar from "./FilterBar";

function Restaurants({ location }) {
  const { restaurants, loading } = useRestaurants(location);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  return (
    <div>
      <FilterBar
        restaurants={restaurants}
        setFilteredRestaurants={setFilteredRestaurants}
        location={location}
      />
      <>
        {!loading && (
          <div className="flex-cols">
            <h2 className="text-center my-10">Restaurants in {location}</h2>
            <div className="grid grid-cols-4 gap-6">
              {(filteredRestaurants.length == 0
                ? restaurants
                : filteredRestaurants
              ).map((restaurant) => {
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
          </div>
        )}
      </>
    </div>
  );
}

export default Restaurants;
