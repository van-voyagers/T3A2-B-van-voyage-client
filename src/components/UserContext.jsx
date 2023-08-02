import React, { useState, createContext, useContext, useEffect } from "react";
import jwtDecode from "jwt-decode";

// Create a new context for User
export const UserContext = createContext();

// Define a context provider component for User
export const UserProvider = (props) => {
  // Initialize token state with value from local storage
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [loading, setLoading] = useState(false); // set loading to false initially

  // Use effect that triggers every time the token changes
  useEffect(() => {
    if (token) {
      // decode token and get expiration date
      const decodedToken = jwtDecode(token);
      const expirationDate = new Date(decodedToken.exp * 1000);

      if (expirationDate < new Date()) {
        // if the token is expired, logout
        logout();
      } else {
        // if the token is still valid, save it in local storage
        localStorage.setItem("token", token);
      }
    } else {
      // if there's no token, remove the token from local storage
      localStorage.removeItem("token");
    }
  }, [token]);

  // Function to logout user, this removes the token
  const logout = () => {
    setToken(null); // This will trigger useEffect to remove token from localStorage
  };

  // Provide the user token, a function to set the token, logout function, and loading state to all children
  return (
    <UserContext.Provider value={{ token, setToken, logout, loading }}>
      {props.children}
    </UserContext.Provider>
  );
};

// Define a custom hook for consuming User context
export const useUserContext = () => {
  // Access user context
  const context = useContext(UserContext);

  // Throw an error if user context is accessed outside of its provider
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  // Return the context to the caller
  return context;
};
