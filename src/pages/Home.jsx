import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage1 from "../assets/images/home-page-1.png";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div>
        <img src={HomePage1} alt="Home Page" className="w-full h-auto" />
      </div>
      
      <Footer />
    </div>
  );
}

export default Home;


