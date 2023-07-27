import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(null);

  const logout = () => {
    // implement your logout logic here
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ token, setToken, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

