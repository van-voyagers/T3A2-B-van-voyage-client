import React, { useState, createContext, useContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [loading, setLoading] = useState(false); // set loading to false initially

  useEffect(() => {
    // Save token in local storage every time it changes
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const logout = () => {
    setToken(null); // This will trigger useEffect to remove token from localStorage
  };

  return (
    <UserContext.Provider value={{ token, setToken, logout, loading }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};





