import React from "react";
import Eddie1 from "../assets/images/vans/eddie/eddie-1.png";
import Marigold1 from "../assets/images/vans/marigold/marigold-1.png";
import VengaBus1 from "../assets/images/vans/venga-bus/venga-bus-1.png";

function HireRates() {
  return (
    <div className="mx-auto px-6 sm:px-16 md:px-16 lg:px-44 max-w-screen-xl text-center space-y-8 mb-8 lg:mb-12 text-voyage-black text-sm sm:text-sm md:text-md lg:text-lg">
      <h1 className="font-roboto font-normal pt-8 lg:pt-12">HIRE RATES</h1>
      <p className="font-mono text-xs sm:text-sm md:text-md lg:text-lg">
        At Van Voyage, we believe that freedom on the road shouldn't cost the
        earth. Our rates are designed to provide a perfect balance between
        comfort and affordability. Our hire rates range from $130 to $240 per
        day, offering you the flexibility to choose the best fit for your budget
        and adventure needs.
        <br></br>
        <br></br>
        Each of our vans has its unique charm and features. To get more specific
        details and understand what best suits your needs, click on the images
        below. This will take you to the bookings page where you can see the
        specifics of each van and make an informed choice. Make your selection
        and let's get you on the road.
      </p>

      <div className="flex flex-wrap justify-center mt-8 sm:mt-12 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/3 lg:w-1/3 px-2 md:mb-0">
          <img src={Eddie1} alt="Eddie 1" className="w-full shadow-xl" />
          <h2 className="text-center">EDDIE</h2>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/3 px-2 md:mb-0">
          <img src={Marigold1} alt="Marigold 1" className="w-full shadow-xl" />
          <h2 className="text-center">MARIGOLD</h2>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/3 px-2 md:mb-0">
          <img src={VengaBus1} alt="Venga Bus 1" className="w-full shadow-xl" />
          <h2 className="text-center">VENGA BUS</h2>
        </div>
      </div>
    </div>
  );
}

export default HireRates;
