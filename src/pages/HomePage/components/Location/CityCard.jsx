import React, { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { LocationsContext } from "@/context/LocationContext";

const images = {
  chennai: "/images/chennai.png",
  delhi: "/images/delhi.png",
  bengaluru: "/images/bengaluru.png",
  mumbai: "/images/mumbai.png",
  hyderabad: "/images/hyderabad.png",
};
function CityCard({ city }) {
  const { selectedLocation, setSelectedLocation } =
    useContext(LocationsContext);

  return (
    <div
      className={`duration-300 cursor-pointer rounded-xl z-0 mx-2 sm:mx-4 my-2 ${
        selectedLocation === city ? "scale-100" : "hover:scale-105"
      }`}
      onClick={() => setSelectedLocation(city)}
      style={{ minWidth: 0 }}
    >
      <Card className="relative overflow-hidden w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] h-[140px] sm:h-[180px] md:h-[200px] rounded-xl cursor-pointer">
        <img
          src={images[city]}
          alt={city}
          className={`absolute inset-0 w-full h-full object-cover ${
            selectedLocation === city ? "border-4 rounded-xl" : ""
          }`}
          style={
            selectedLocation === city
              ? { borderColor: "rgba(255,107,94,1)" }
              : {}
          }
        />
        <CardContent className="relative z-20 h-full flex flex-col justify-between p-2 sm:p-4">
          <div>
            <h2 className="text-white text-lg sm:text-xl font-bold">{city}</h2>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CityCard;
