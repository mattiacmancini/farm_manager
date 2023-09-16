import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to set the user when they log in
  const login = (token) => {
    const userData = jwt_decode(token);
    localStorage.setItem('token', token);
    setUser(userData);
    console.log(userData)
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('token');
  setUser(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
  
    if (storedToken) {
      const userData = jwt_decode(storedToken);
      setUser(userData);
    }
    // This will trigger a re-render when the user changes
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
