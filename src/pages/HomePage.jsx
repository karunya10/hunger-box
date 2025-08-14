import useRestaurants from "../hooks/useRestaurants";

function HomePage() {
  const { restaurants, loading } = useRestaurants("chennai");
  console.log(restaurants);
  return (
    <>
      <div>HomePage</div>
      {!loading &&
        restaurants.map((restaurant) => {
          return (
            <>
              <img src={restaurant.image} />
              <div>{restaurant.name}</div>
              <div>{restaurant.rating}</div>
              <div>
                {restaurant.cuisines.map((cuisine) => {
                  return (
                    <>
                      <span>{cuisine}</span>
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
    </>
  );
}

export default HomePage;
