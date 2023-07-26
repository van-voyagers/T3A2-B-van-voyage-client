import React from "react";
import Eddie1 from "../assets/images/vans/eddie/eddie-1.png"
import Marigold1 from "../assets/images/vans/marigold/marigold-1.png"
import VengaBus1 from "../assets/images/vans/venga-bus/venga-bus-1.png"

function HireRates() {
  return (
    <div className="mx-auto px-6 sm:px-16 md:px-16 lg:px-44 max-w-screen-xl text-center space-y-8 mb-8 lg:mb-12 text-voyage-black text-sm sm:text-sm md:text-md lg:text-lg">
      <h1 className="font-roboto font-normal pt-8 lg:pt-12">HIRE RATES</h1>
      <p className="font-roboto-mono text-xs sm:text-sm md:text-md lg:text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Ut enim ad minim veniam, quis exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. 
        <br></br>
        <br></br>
        Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad
        minim veniam, quis exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div className="flex flex-wrap justify-center mt-8 sm:mt-12 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/3 lg:w-1/3 px-2 md:mb-0">
          <img src={Eddie1} alt="Eddie 1" className="w-full shadow-xl"/>
          <h2 className="text-center">EDDIE</h2>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/3 px-2 md:mb-0">
          <img src={Marigold1} alt="Marigold 1" className="w-full shadow-xl"/>
          <h2 className="text-center">MARIGOLD</h2>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/3 px-2 md:mb-0">
          <img src={VengaBus1} alt="Venga Bus 1" className="w-full shadow-xl"/>
          <h2 className="text-center">VENGA BUS</h2>
        </div>
      </div>
    </div>
  );
}

export default HireRates;


