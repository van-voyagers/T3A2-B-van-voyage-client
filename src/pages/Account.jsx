import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PersonalDetails from "../components/PersonalDetails";  
import UpdateDetailsForm from "../components/UpdateDetailsForm";  
import ChangePasswordForm from "../components/ChangePasswordForm";
import BookingHistory from '../components/BookingHistory'

function Account() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <p className="text-center font-mono text-voyage-black mt-20 text-xl underline underline-offset-8">ACCOUNT SETTINGS</p>
      <p className="text-center font-roboto text-voyage-black mt-20 mb-10 text-md">PERSONAL DETAILS</p>
      <PersonalDetails /> 
      <p className="text-center font-roboto text-voyage-black mt-20 mb-10 text-md">UPDATE PERSONAL DETAILS</p>
      <UpdateDetailsForm /> 
      <p className="text-center font-roboto text-voyage-black mb-10 text-md">CHANGE PASSWORD</p>
      <ChangePasswordForm />
      <p className="text-center font-roboto text-voyage-black mb-4 mt-10 text-xl underline underline-offset-8">BOOKING HISTORY</p>
      <BookingHistory />
      <Footer />
    </div>
  );
}

export default Account;


