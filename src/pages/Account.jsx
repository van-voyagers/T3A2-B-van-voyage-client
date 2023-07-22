import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Account() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <p className="text-center mt-20 text-xl flex-grow">Account</p>
      <Footer />
    </div>
  );
}

export default Account;
