import React, { useState, createContext, useContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(null);

  // On initial render, try to get the token from local storage
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  const logout = () => {
    // implement your logout logic here
    // Clear token from local storage as well
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ token, setToken, logout }}>
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


