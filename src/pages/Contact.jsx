import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactPage1 from "../assets/images/contact-page-1.png";
import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        <img src={ContactPage1} alt="Home Page" className="w-full h-auto" />
      </div>
      <p className="text-center font-roboto text-voyage-black mt-20 mb-10 text-md lg:text-xl">CONTACT US</p>
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Contact;
