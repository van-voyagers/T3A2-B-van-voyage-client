import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAccountForm() {
  // Uses React hooks to define state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hook for programmatically changing the current URL
  const navigate = useNavigate();

  // Defines API_URL based on the current mode (production or development)
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  // Defines the function to submit the form
  const handleSubmit = async (event) => {
    // Prevents the default form submission behaviour
    event.preventDefault();

    // Checks if the password length is less than 6
    if (password.length < 6) {
      // Alerts the user that the password must be at least 6 characters long
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      // Logs the API URL to the console
      console.log(API_URL);
      // Sends a POST request to create an account with the provided email and password
      const response = await axios.post(`${API_URL}/users/create-account`, {
        email,
        password,
      });

      // If the request was successful, alert the user and navigate to the login page
      alert("Account successfully created!");
      navigate("/login");
    } catch (error) {
      // If there was an error during the request, log it to the console
      console.error(error);

      // If the server responded with a 400 status, alert the user with the error message from the server
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message || "An error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center px-5 space-y-4 text-voyage-black"
    >
      <div className="w-full shadow-lg">
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
          required
          className="w-full h-10 pl-2 border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
        />
      </div>
      <div className="w-full shadow-lg">
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
          required
          className="w-full h-10 pl-2 border-voyage-black border-opacity-50 focus:border-voyage-black focus:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-voyage-black focus:ring-opacity-50 rounded"
        />
      </div>
      <div className="underline">
        <Link to="/login" className="text-voyage-black">
          Already have an account? Log in here ➚
        </Link>
      </div>
      <div className="self-start">
        <button
          type="submit"
          className="bg-voyage-green text-white font-roboto font-light rounded px-4 py-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CreateAccountForm;
