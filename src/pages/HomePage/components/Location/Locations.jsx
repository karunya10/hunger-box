import React, { useContext } from "react";
import CityCard from "./CityCard";
import { LocationsContext } from "@/context/LocationContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Locations() {
  const { locations } = useContext(LocationsContext);
  return (
    <>
      <div className="flex flex-col items-center my-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Choose your city
        </h2>
        <div className="flex justify-center gap-3 sm:gap-5 w-full">
          <Carousel className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
            <CarouselContent>
              {locations.map((city) => {
                return (
                  <CarouselItem
                    key={city}
                    className="pl-2 sm:pl-4 basis-3/4 sm:basis-1/2 md:basis-1/3"
                  >
                    <CityCard city={city} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default Locations;
