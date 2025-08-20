import React from "react";
import { Star } from "lucide-react";

function RestaurantInfo({ filteredRestaurant }) {
  return (
    <div className="text-center space-y-4">
      <img
        src={filteredRestaurant.image}
        className="rounded-xl w-full h-48 sm:h-64 md:h-80 object-cover"
        alt={filteredRestaurant.name}
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
      <p className="text-sm text-gray-600">{filteredRestaurant.description}</p>
    </div>
  );
}

export default RestaurantInfo;
