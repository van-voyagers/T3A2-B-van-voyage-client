import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutPage1 from "../assets/images/about-page-1.png";
import AboutPage2 from "../assets/images/about-page-2.png";
import AboutPageContent from "../components/AboutPageContent";

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        <img src={AboutPage1} alt="Home Page" className="w-full h-auto" />
      </div>
      <AboutPageContent />
      <div>
        <img src={AboutPage2} alt="Home Page" className="w-full h-auto" />
      </div>
      <Footer />
    </div>
  );
}

export default About;
