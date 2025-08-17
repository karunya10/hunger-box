import React, { useContext } from "react";
import CityCard from "./CityCard";
import { LocationsContext } from "../../context/locationContext";
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
        <div className="flex justify-center gap-5">
          <Carousel className="w-250">
            <CarouselContent className="-ml-4">
              {locations.map((city) => {
                return (
                  <CarouselItem key={city} className="pl-4 basis-1/3">
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
