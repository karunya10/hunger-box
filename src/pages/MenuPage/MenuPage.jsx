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
      <div className=" flex flex-col lg:flex-row relative">
        <Button
          className="w-24 sm:w-32 block mx-auto rounded-lg bg-red-400 hover:bg-red-500 text-white font-semibold my-5 px-2 sm:px-4"
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </Button>
        <div className="w-full lg:max-w-3xl mx-auto px-4 py-6 space-y-6 order-2 lg:order-1">
          <Cart className="mb-6 mx-auto lg:hidden" />
          {!loadingRestaurants && filteredRestaurant && (
            <RestaurantInfo filteredRestaurant={filteredRestaurant} />
          )}
          <div>
            {!menuLoading && menus.length > 0 && (
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
        <div className="hidden lg:block order-2 lg:order-2">
          <Cart />
        </div>
      </div>
    </>
  );
}

export default MenuPage;
