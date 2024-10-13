// AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));

  const login = () => {
    // Logic for login
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Logic for logout
    setIsAuthenticated(false);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
