import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/UserContext";
import { toast } from 'react-toastify'

// LoginForm component handles the user login process
function LoginForm() {
  // Using useState hooks to set and manage email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useNavigate hook from react-router for navigation
  const navigate = useNavigate();

  // useContext hook to get the user's token and setToken function from UserContext
  const { token, setToken } = useContext(UserContext);

  // Define the API_URL based on the mode (production or development)
  const API_URL =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  // useEffect hook to log the initial value of the token
  useEffect(() => {
    console.log("Token before update:", token);
  }, []);

  // useEffect hook to log the updated value of the token whenever it changes
  useEffect(() => {
    console.log("Token after update:", token);
  }, [token]);

  // handleSubmit function handles the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to sign in the user
      const response = await axios.post(`${API_URL}/users/sign-in`, {
        email,
        password,
      });

      console.log("Response data:", response.data);

      // Update the token in the UserContext
      setToken(response.data.token);

      // Save the token in local storage
      localStorage.setItem("token", response.data.token);

      // Handle successful submission here
      toast.success("Successfully signed in!");
      navigate("/account");
    } catch (error) {
      console.error(error);
      // Handle incorrect password error
      if (error.response && error.response.status === 401) {
        alert(error.response.data.message);
      } else {
        toast.error("Incorrect Password!");
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
        <Link to="/signup" className="text-voyage-black">
          Don't have an account? Sign up here ➚
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

export default LoginForm;
