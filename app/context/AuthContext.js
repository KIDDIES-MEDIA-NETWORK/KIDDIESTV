"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import io from 'socket.io-client';

// Create the context
export const AuthContext = createContext();

// Initialize socket connection
const socket = io('https://lkn.up.railway.app');

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const [token, setToken] = useState(null);
    const [hearts, setHearts] = useState([]);
    const [heartCount, setHeartCount] = useState([]);
    const [viewers, setViewers] = useState(0);
    const [channelSlug, setChannelSlug] = useState(0);
    const [channelInfo, setChannelInfo] = useState();


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

    const fetchHeartCount = async (channelId) => {
      console.log(channelId)
        try {
          const response = await axios.get(`https://lkn.up.railway.app/channels/${channelId}/heart`);
          console.log(response.data.heartCount)
          setHeartCount(response.data.heartCount)
          return response.data.heartCount;
        } catch (error) {
          console.error('Error fetching heart count:', error);
          return 0;
        }
      };
      

    const handleSendHeart = async (channelId) => {
        const heartData = { left: `${Math.random() * 80 + 10}%` }; // Customize heart data as needed
        addHeart(heartData);
        socket.emit('sendHeart', heartData); // Emit heart event to other connected users
      
        try {
          // Call the backend to increment the heart count
        //   const response = await axios.put(`http://localhost:/8000/api/hearts/${channelId}`);
          const response = await axios.put(`https://lkn.up.railway.app/channels/${channelId}/heart`);
          console.log('Updated heart count:', response);
          fetchHeartCount(channelId)
        } catch (error) {
          console.error('Error incrementing heart count:', error);
        }
      };


      
      const fetchChannel = async (channelId) => {
        try {
          const response = await axios.get(`https://lkn.up.railway.app/channels/${channelId}`);
          setChannelInfo(response?.data?.data)
          return response?.data?.data?.comments;
        } catch (error) {
          console.error('Error fetching heart count:', error);
          return 0;
        }
      };

    const fetchUser = async () => {
        if (!token) return; // Only fetch if token is available

        try {
            const res = await axios.get(
                `https://lkn.up.railway.app/api/user`,
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
        <AuthContext.Provider value={{ hearts, addHeart, setHearts, email, setEmail, userInfo, handleSendHeart, fetchHeartCount, fetchChannel, viewers, setChannelSlug, channelInfo, setChannelInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
