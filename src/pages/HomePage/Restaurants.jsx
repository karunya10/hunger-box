import { useContext } from "react";
import RestaurantCard from "./RestaurantCard";
import FilterBar from "./FilterBar";
import { RestaurantContext } from "../../context/RestaurantContext";


function Restaurants() {
  const {
    restaurants,
    filteredRestaurants,
    loadingRestaurants: loading,
  } = useContext(RestaurantContext);
 
  return (
    <div>
      <FilterBar />
      <>
        {!loading && (
          <div className="flex-cols">
            <h2 className="text-center my-10">Restaurants in city</h2>
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
                    id={id}
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
