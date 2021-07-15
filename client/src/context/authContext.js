import React, { createContext, useState } from 'react';

const initialState = localStorage.getItem('token') || '';

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
