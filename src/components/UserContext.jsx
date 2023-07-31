import React, { useState, createContext, useContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
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




