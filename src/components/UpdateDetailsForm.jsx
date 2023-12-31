import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/UserContext";
import { toast } from 'react-toastify'

function UpdateDetailsForm() {
  // Initialize state variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [dobType, setDobType] = useState("text");
  const [driversLicense, setDriversLicense] = useState("");

  // Navigation hook from react-router-dom
  const navigate = useNavigate();

  // Extract token from UserContext
  const { token } = useContext(UserContext);

  // Determine API endpoint based on environment (development or production)
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  // Change input type to 'date' when dob field is in focus
  const handleDobFocus = (e) => setDobType("date");

  // Change input type back to 'text' when dob field is not in focus and is empty
  const handleDobBlur = (e) => {
    if (e.target.value === "") {
      setDobType("text");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Construct the object to be sent in the PUT request.
    // Only include fields that are not empty.
    const updatedFields = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(phoneNumber && { phoneNumber }),
      ...(address && { address }),
      ...(dob && { dob }),
      ...(driversLicense && { driversLicense }),
    };

    try {
      // Send a PUT request to update user details
      const response = await axios.put(
        `${API_URL}/users/update`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      toast.success("Successfully updated details!");

      // Navigate to account page and refresh the page to reflect new changes
      navigate("/account");
      window.location.reload();
    } catch (error) {
      console.error(error.response);
   
   if (error.response && error.response.status === 409) {
       // Handling the case where the email address already exists
       toast.error(error.response.data.message || "Email address already exists.");
   } else {
       // Handling other error cases
       toast.error("An error occurred while updating details.");
   }
      
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-sm w-full lg:max-w-screen-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-5 space-y-4 text-voyage-black"
        >
          <div className="w-full space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name..."
                className="w-full h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
              />

              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name..."
                className="w-full h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
              />
            </div>

            <div className="flex space-x-4">
              <input
                type={dobType}
                id="dob"
                name="dob"
                value={dob}
                onFocus={handleDobFocus}
                onBlur={handleDobBlur}
                onChange={(e) => setDob(e.target.value)}
                placeholder="D.O.B..."
                className="w-full h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
              />

              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number..."
                className="w-full h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
              />
            </div>

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email..."
              className="w-full h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
            />

            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address..."
              className="w-full h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
            />

            <input
              type="text"
              id="driversLicense"
              name="driversLicense"
              value={driversLicense}
              onChange={(e) => setDriversLicense(e.target.value)}
              placeholder="Driver's License..."
              className="w-1/2 h-10 pl-2 shadow-lg border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
            />
          </div>

          <div className="self-start">
            <button
              type="submit"
              className="bg-voyage-green shadow-lg text-white font-roboto mb-10 font-light rounded px-4 py-2"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateDetailsForm;
