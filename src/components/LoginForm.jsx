import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/UserContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserContext);

  // Define API_URL based on the mode
  const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;

  useEffect(() => {
    console.log("Token before update:", token);
  }, []);

  useEffect(() => {
    console.log("Token after update:", token);
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/users/sign-in`, {
        email,
        password,
      });

      console.log("Response data:", response.data);
      setToken(response.data.token);

      // Save token to local storage
      localStorage.setItem("token", response.data.token);

      // Handle successful submission here
      alert("Successfully signed in!");
      navigate("/account");
    } catch (error) {
      console.error(error);
      // Handle incorrect password error
      if (error.response && error.response.status === 401) {
        alert(error.response.data.message);
      } else {
        alert("Incorrect Password!");
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
