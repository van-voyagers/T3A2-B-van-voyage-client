import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactPage1 from "../assets/images/contact-page-1.png";
import ContactForm from "../components/ContactForm";
import ReviewForm from "../components/ReviewForm";

function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        <img src={ContactPage1} alt="Home Page" className="w-full h-auto" />
      </div>
      <p className="text-center font-mono text-voyage-black mb-12 my-20 text-md lg:text-xl">CONTACT US</p>
      <ContactForm />
      <p className="text-center font-mono text-voyage-black mt-24 mb-12 text-md lg:text-xl">LEAVE US A REVIEW</p>
      <ReviewForm />
      <Footer />
    </div>
  );
}

export default Contact;
