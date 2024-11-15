"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import io from 'socket.io-client';

// Create the context
export const AuthContext = createContext();

// Initialize socket connection
const socket = io('https://lkn-kfic.onrender.com');

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const [token, setToken] = useState(null);
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem("gpt64");
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        // Listen for heart events from other users
        socket.on('receiveHeart', (heartData) => {
            addHeart(heartData);
        });

        return () => {
            socket.off('receiveHeart');
        };
    }, []);

    const addHeart = (data) => {
        const newHeart = {
            id: Date.now(),
            left: data.left || `${Math.random() * 80 + 10}%`, // Randomize left position if not provided
        };
        setHearts((prevHearts) => [...prevHearts, newHeart]);

        setTimeout(() => {
            setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== newHeart.id));
        }, 3000); // Heart animation duration
    };

    const handleSendHeart = () => {
        const heartData = { left: `${Math.random() * 80 + 10}%` }; // Customize heart data as needed
        addHeart(heartData);
        socket.emit('sendHeart', heartData); // Emit heart event to other connected users
    };

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
            if (res?.data?.success) {
                setUserInfo(res?.data?.user);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [token]);

    return (
        <AuthContext.Provider value={{ hearts, addHeart, setHearts, email, setEmail, userInfo, handleSendHeart }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
