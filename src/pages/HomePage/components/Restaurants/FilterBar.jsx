import { useContext, useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RestaurantContext } from "@/context/RestaurantContext";
import { LocationsContext } from "@/context/LocationContext";

function FilterBar() {
  const { restaurants, setFilteredRestaurants } = useContext(RestaurantContext);
  const { selectedLocation: location } = useContext(LocationsContext);

  const [filters, setFilters] = useState({
    search: "",
    rating: null,
    isVeg: null,
  });

  useEffect(() => {
    setFilteredRestaurants(filteredRestaurants);
  }, [filters]);

  useEffect(() => {
    setFilters({
      search: "",
      rating: null,
      isVeg: null,
    });
  }, [location]);

  const handleSearchFilter = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };
  const handleRatingFilter = () => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === 4.5 ? null : 4.5,
    }));
  };
  const handleVegFilter = () => {
    setFilters((prev) => ({
      ...prev,
      isVeg: prev.isVeg === true ? null : true,
    }));
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const searchMatch =
      filters.search === "" ||
      restaurant.name.toLowerCase().includes(filters.search.toLowerCase());
    const ratingMatch =
      filters.rating === null || restaurant.rating >= filters.rating;
    const isVegMatch =
      filters.isVeg === null || restaurant.isVeg === filters.isVeg;

    return searchMatch && ratingMatch && isVegMatch;
  });

  return (
    <>
      <div className="max-w-[1200px] mx-auto my-10">
        <div className="flex items-center gap-2 ">
          <SearchInput
            value={filters.search}
            onChange={handleSearchFilter}
            placeholder="Search restaurants..."
          />
          <Badge
            variant="outline"
            className="whitespace-nowrap"
            style={{ color: "#FF6F61", backgroundColor: "#FFF5F3" }}
          >
            {location}
          </Badge>
        </div>
        <div className="flex gap-5 my-2 justify-center">
          <Badge
            variant="default"
            className="whitespace-nowrap flex cursor-pointer hover:scale-108"
            style={
              filters.rating
                ? { color: "#FFF5F3", backgroundColor: "#FF6F61" }
                : { color: "#FF6F61", backgroundColor: "#FFF5F3" }
            }
            onClick={handleRatingFilter}
          >
            <Star />
            <p>4.5 + Rating</p>
          </Badge>
          <div className="flex items-center space-x-2">
            <Switch
              id="veg-filter"
              checked={filters.isVeg}
              onCheckedChange={handleVegFilter}
              style={{ backgroundColor: filters.isVeg ? "#FF6F61" : "grey" }}
            />
            <Label
              htmlFor="veg-filter"
              style={{ color: "#FF6F61", backgroundColor: "#FFF5F3" }}
            >
              Veg
            </Label>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterBar;
