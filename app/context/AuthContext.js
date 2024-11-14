// context/AuthContext.js
"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";

// Create the context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Check if running in the browser before accessing localStorage
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem("gpt64");
            setToken(storedToken);
        }
    }, []);

    const fetchUser = async () => {
        if (!token) return; // Only fetch if token is available

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

            if (!res?.data?.success) return;
            setUserInfo(res?.data?.user);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [token]);

    console.log(userInfo);

    return (
        <AuthContext.Provider value={{ email, setEmail, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
