import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <p className="text-center mt-20 text-xl flex-grow">Contact</p>
      <Footer />
    </div>
  );
}

export default Contact;
