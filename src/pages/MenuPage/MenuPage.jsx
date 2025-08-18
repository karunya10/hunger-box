import { useParams, useNavigate } from "react-router-dom";
import useMenu from "@/hooks/useMenu";
import { useContext, useEffect } from "react";
import { RestaurantContext } from "@/context/RestaurantContext";
import { CartContext } from "@/context/CartContext";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import Cart from "./components/Cart";
import RestaurantInfo from "./components/RestaurantInfo";
import Category from "./components/Category";

function MenuPage() {
  const { city, restaurantId } = useParams();
  const navigate = useNavigate();
  const { menus, loading: menuLoading } = useMenu(city, restaurantId);

  const { restaurants, loadingRestaurants } = useContext(RestaurantContext);

  const { setCurrentRestaurantId } = useContext(CartContext);

  useEffect(() => {
    setCurrentRestaurantId(restaurantId);
  }, []);

  const filteredRestaurant = restaurants.find((restaurant) => {
    return restaurant.id == restaurantId;
  });

  const groupByCategories = menus.reduce((accumulator, menu) => {
    if (!accumulator[menu.category]) {
      accumulator[menu.category] = [];
    }
    accumulator[menu.category].push(menu);
    return accumulator;
  }, {});

  return (
    <>
      <div className="relative flex">
        <Button
          className=" rounded-lg bg-red-400 hover:bg-red-500 text-white font-semibold my-5 mx-5"
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </Button>
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {!loadingRestaurants && filteredRestaurant && (
            <RestaurantInfo filteredRestaurant={filteredRestaurant} />
          )}

          <div>
            {!menuLoading && (
              <Accordion
                type="single"
                className="w-full space-y-4"
                defaultValue={Object.keys(groupByCategories)[0]}
              >
                {Object.entries(groupByCategories).map((entry) => {
                  const [category, items] = entry;
                  return (
                    <Category
                      key={category}
                      category={category}
                      items={items}
                    />
                  );
                })}
              </Accordion>
            )}
          </div>
        </div>

        <Cart />
      </div>
    </>
  );
}

export default MenuPage;
