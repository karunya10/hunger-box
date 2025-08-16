import { useParams } from "react-router-dom";
import useMenu from "@/hooks/useMenu";
import { useContext } from "react";
import { RestaurantContext } from "@/context/RestaurantContext";

import { Accordion } from "@/components/ui/accordion";

import Cart from "./Cart";
import RestaurantInfo from "./RestaurantInfo";
import Category from "./Category";

function MenuPage() {
  const { city, restaurantId } = useParams();

  const { menus, loading: menuLoading } = useMenu(city, restaurantId);

  const { restaurants, loadingRestaurants } = useContext(RestaurantContext);

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
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
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
                {Object.entries(groupByCategories).map(([category, items]) => {
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
