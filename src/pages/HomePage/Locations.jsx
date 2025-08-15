import React from "react";
import CityCard from "./CityCard";

function Locations({ locations, onSelectLocation, selectedLocation }) {
  return (
    <>
      <div className="flex flex-col items-center my-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Choose your city
        </h2>
        <div className="flex justify-center gap-5">
          {locations.map((city) => {
            return (
              <CityCard
                city={city}
                onSelectLocation={onSelectLocation}
                selectedLocation={selectedLocation}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Locations;
