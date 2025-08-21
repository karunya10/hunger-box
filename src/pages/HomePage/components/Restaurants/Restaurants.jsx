import { useContext } from "react";
import RestaurantCard from "./RestaurantCard";
import FilterBar from "./FilterBar";
import { RestaurantContext } from "@/context/RestaurantContext";
import RestaurantCardSkeleton from "@/components/RestaurantCardSkeleton";

function Restaurants() {
  const { filteredRestaurants, loadingRestaurants: loading } =
    useContext(RestaurantContext);

  return (
    <div>
      <FilterBar />
      <div className="flex-cols">
        <h2 className="text-center my-10">Restaurants in city</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 25 }).map((_, idx) => (
              <RestaurantCardSkeleton key={idx} />
            ))
          ) : filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => {
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
            })
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No restaurants found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
