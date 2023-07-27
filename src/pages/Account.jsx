import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PersonalDetails from "../components/PersonalDetails";  // Import the PersonalDetails component
import UpdateDetailsForm from "../components/UpdateDetailsForm";  // Import the UpdateDetailsForm component

function Account() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <p className="text-center font-roboto-mono text-voyage-black mt-20 mb-16 text-xl">Account Settings</p>
      <PersonalDetails /> {/* Use the PersonalDetails component here */}
      <p className="text-center font-roboto-mono text-voyage-black mt-20 mb-16 text-xl">Update Personal Details</p>
      <UpdateDetailsForm /> {/* Use the UpdateDetailsForm component here */}
      <Footer />
    </div>
  );
}

export default Account;


