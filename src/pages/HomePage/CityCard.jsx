import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const IMG_URL = "/images/chennai.jpg";
function CityCard({ city, onSelectLocation, selectedLocation }) {
  return (
    <Card
      className={`relative overflow-hidden w-[300px] h-[200px] rounded-xl shadow-md cursor-pointer ${
        selectedLocation === city
          ? "ring-5 ring-[rgba(255,107,94,0.4)] scale-108"
          : ""
      }`}
      onClick={() => {
        onSelectLocation(city);
      }}
    >
      <img
        src={IMG_URL}
        alt={city}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

      <CardContent className="relative z-20 h-full flex flex-col justify-between p-4">
        <div>
          <h2 className="text-white text-xl font-bold">{city}</h2>
        </div>
      </CardContent>
    </Card>
  );
}

export default CityCard;
