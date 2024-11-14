"use client"
// context/AuthContext.js
import { createContext, useContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("");

  

  return (
    <AuthContext.Provider value={{ email, setEmail}}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => useContext(AuthContext);

