import React from "react";
import { NavLink } from "react-router-dom";

function TravelWithUs() {
  return (
    <div className="mx-auto px-6 sm:px-16 md:px-16 lg:px-44 max-w-screen-xl text-center space-y-8 my-8 lg:mb-12 text-voyage-black text-sm sm:text-sm md:text-md lg:text-lg">
      <h1 className="font-mono lg:text-xl font-normal py-4 sm:py-8 lg:pt-12">
        TRAVEL WITH US
      </h1>
      <p className="font-mono text-xs sm:text-sm md:text-md lg:text-lg">
        Vintage camper-vans, meticulously refurbished and uniquely designed,
        available for hire. These are self-sustaining mobile cottages -
        conveniently situated in Location, Location, Australia.
      </p>

      <div className="flex justify-center pb-4">
        <button className="list-none border border-voyage-black font-normal px-2 py-1">
          <NavLink
            to="/vans"
            className="transition-all duration-100 border-b border-transparent hover:border-voyage-black"
          >
            BOOK NOW
          </NavLink>
        </button>
      </div>
    </div>
  );
}

export default TravelWithUs;
