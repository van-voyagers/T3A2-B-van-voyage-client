import React from "react";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreateAccountForm from "../components/CreateAccountForm";

function SignUp() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-center text-xl mb-6 font-mono text-voyage-black">CREATE AN ACCOUNT</p>
        <CreateAccountForm />
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;

