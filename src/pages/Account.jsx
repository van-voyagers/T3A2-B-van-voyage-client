import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PersonalDetails from "../components/PersonalDetails";  
import UpdateDetailsForm from "../components/UpdateDetailsForm";  
import ChangePasswordForm from "../components/ChangePasswordForm";

function Account() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <p className="text-center font-roboto text-voyage-black mt-20 text-xl">ACCOUNT SETTINGS</p>
      <p className="text-center font-roboto text-voyage-black mt-20 mb-10 text-md">Personal Details</p>
      <PersonalDetails /> 
      <p className="text-center font-roboto text-voyage-black mt-20 mb-10 text-md">Update Personal Details</p>
      <UpdateDetailsForm /> 
      <p className="text-center font-roboto text-voyage-black mb-10 text-md">Change Password</p>
      <ChangePasswordForm />
      <Footer />
    </div>
  );
}

export default Account;


