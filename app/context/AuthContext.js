"use client"
// context/AuthContext.js
import { createContext, useContext,useEffect, useState } from 'react';
import axios from "axios";
// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const token = localStorage.getItem("gpt64")


    const fetchUser = async() => {
        try {
            const res = await axios.get(
              `https://lkn-kfic.onrender.com/api/user`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Pass the token in the headers
                },
              }
            );
            console.log(res);
      
            if (!res?.data?.success) return 
           setUserInfo(res?.data?.user)
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        fetchUser()
    }, [token])

    console.log(userInfo)

  return (
    <AuthContext.Provider value={{ email, setEmail, userInfo}}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => useContext(AuthContext);

