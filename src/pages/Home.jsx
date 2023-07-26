import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage1 from "../assets/images/home-page-1.png";
import HomePage2 from "../assets/images/home-page-2.png";
import HomePage3 from "../assets/images/home-page-3.png";
import HomePage4 from "../assets/images/home-page-4.png";
import TravelWithUs from "../components/TravelWithUs";
import HireRates from "../components/HireRates";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div>
        <img src={HomePage1} alt="Home Page" className="w-full h-auto" />
      </div>

      <TravelWithUs />
      

      <div>
        <img src={HomePage2} alt="Home Page" className="w-full h-auto" />
      </div>
      <HireRates />      
      <div>
        <img src={HomePage3} alt="Home Page" className="w-full h-auto" />
      </div>
      <div>
        <img src={HomePage4} alt="Home Page" className="w-full h-auto" />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
