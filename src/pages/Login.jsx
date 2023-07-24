import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <div className="flex flex-col items-center justify-center flex-grow">
          <p className="text-center text-xl mb-6 font-roboto-mono text-voyage-black">Login</p>
          <LoginForm />
        </div>
      <Footer />
    </div>
  );
}

export default Login;
