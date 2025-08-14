import useRestaurants from "../../hooks/useRestaurants";
import { Button } from "@/components/ui/button";
import RestaurantCard from "@/pages/HomePage/RestaurantCard";

function HomePage() {
  const { restaurants, loading } = useRestaurants("chennai");

  return (
    <>
      <div>HomePage</div>
      {!loading && (
        <div className="grid grid-cols-5 gap-4">
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
  );
}

export default HomePage;
