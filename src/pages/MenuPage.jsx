import { useParams } from "react-router-dom";
import useMenu from "@/hooks/useMenu";
import { useContext } from "react";
import { RestaurantContext } from "@/context/RestaurantContext";
import { Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

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
  console.log("🚀 ~ MenuPage ~ groupByCategories:", groupByCategories);

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {!loadingRestaurants && filteredRestaurant && (
          <div className="text-center space-y-4">
            <img
              src={filteredRestaurant.image}
              className="rounded-xl w-full h-80 object-cover"
            />
            <div className="text-3xl font-bold">{filteredRestaurant.name}</div>
            <div className="text-sm text-gray-600">
              {" "}
              {filteredRestaurant.cuisines.join(",")}
            </div>
            <div className="flex justify-center items-center gap-2 text-yellow-500 font-semibold">
              <Star className="w-4 h-4" />
              {filteredRestaurant.rating}
            </div>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos odio
              eligendi minus cupiditate alias, earum quidem fugit, nemo
              blanditiis explicabo in nam voluptates natus! Repudiandae iste
              earum ipsam impedit maiores.
            </p>
          </div>
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
                  <AccordionItem key={category} value={category}>
                    <AccordionTrigger className="text-xl font-semibold capitalize">
                      {category}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      {items.map((menu) => (
                        <Card key={menu.id}>
                          <CardContent className="p-4 flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-lg">
                                {menu.name}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-red-500">
                                ₹{menu.price.toFixed(2)}
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <button className="border px-2 rounded">
                                  -
                                </button>
                                <span>0</span>
                                <button className="border px-2 rounded">
                                  +
                                </button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>
      </div>
    </>
  );
}

export default MenuPage;
