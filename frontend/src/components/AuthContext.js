import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to set the user when they log in
  const login = (token) => {
    // Decode the user data from the token
    const userData = jwt_decode(token);
  
    // Store the token in local storage
    localStorage.setItem('token', token);
  
    // Set the user data in the state
    setUser(userData);
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    setUser(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
  
    // If a token exists, set the user
    if (storedToken) {
      // You may want to decode the token and perform additional checks here
      setUser({ token: storedToken });
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
