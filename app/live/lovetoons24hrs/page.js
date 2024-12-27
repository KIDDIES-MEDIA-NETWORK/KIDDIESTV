"use client";
import { Metadata } from "@/app/components/Metadata";
import  "@/app/globals.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "@/app/components/Header";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Heart from "react-animated-heart";
import { sampleComment, channels } from "@/app/data/sampleData";
import Image from "next/image";
import Link from "next/link";
import { FormatDate } from "@/app/utils/FormatDate";
import EmojiPicker from "emoji-picker-react";
import Swiper from "@/app/components/Swiper";
import HeartAnimation from "@/app/components/Heart";
import { useAuth } from "@/app/context/AuthContext";
import io from "socket.io-client";
import { FaRegEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const socket = io("https://lkn.up.railway.app");
// const socket = io("http://localhost:8000");

const Station = ({ params }) => {
  const lastCommentRef = useRef(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setClick] = useState(false);
  const [comments, setComments] = useState([]);
  const [newPostComment, setNewPostComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [token, setToken] = useState(null);
  const [channelInfo, setChannelInfo] = useState();
  // const [hearts, setHearts] = useState();
  const { channel } = params;
  const isAdmin = false;
  const { heartCount, userInfo, handleSendHeart, fetchHeartCount } = useAuth();

  const [viewers, setViewers] = useState();
  const scrollToLastComment = () => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    // Check if code is running in the browser
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("gpt64");
      setToken(storedToken); // Set the token in state
    }
  }, []); // Run once on mount

  const [streamLink, setStreamLink] = useState("");
 

  useEffect(() => {
    // Fetch channel data using Axios
    const fetchChannel = async () => {
      try {
        const response = await axios.get(
          `https://lkn.up.railway.app/channels/${channel}`
        );
        setChannelInfo(response?.data?.data);
        const { streamLink } = response?.data?.data;
        setStreamLink(streamLink);
      } catch (error) {
        console.error("Error fetching channel:", error);
      }
    };

    if (params?.channel) {
      fetchChannel();
    }
  }, [params?.channel]);

  useEffect(() => {
    if (streamLink && !playerRef.current) {
      // Initialize Video.js player with the fetched stream link
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        preload: "auto",
        fluid: true,
        sources: [
            {
              src: "https://zkpywpmblbeg-hls-live.5centscdn.com/LOVEWORLDKIDDIES/7cd9d740a2b7ea3e70246ab8245b8325.sdp/playlist.m3u8",
              type: "application/x-mpegURL",
            },
          ],
      });

      playerRef.current.on("waiting", () => setLoading(true));
      playerRef.current.on("playing", () => setLoading(false));
      playerRef.current.on("error", (e) => {
        console.error("Video.js error:", e);
        setLoading(true);
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [streamLink]);

  

 

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter action (new line in input)
      createComment(); // Send the comment
    }
  };

  return (
    <div>
      
      <div className="">
        

        <div
          style={{
            backgroundImage: `url(/assets/png/livebg.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="md:flex justify-center  items-center min-h-screen w-full sm:px-5 md:px-10 md:pt-24"
        >
          <div className="col-span-6 pt-16 md:pt-0">
            <div className="relative h-full w-full   flex flex-col items-ce nter justify-c enter  m-auto ">
              <video
                ref={videoRef}
                className="video-js  vjs-default-skin player_236158168-dimensions vjs-controls-enabled vjs-workinghover vjs-v7 vjs-live vjs-has-started vjs-paused vjs-user-inactive vjs-tech vjs-big-play-centered object-cover h-full w-full absolute inset-0"
                autoPlay
                playsInline
              />
              <div className="hidden md:flex justify-between items-center bg-primary text-white font-sniglet rounded-b-xl px-6 py-2">
                {" "}
                <div>
                  <small>You are watching</small>
                  <h1 className="text-xl uppercase font-bold">
                    Lovetoons TV 24hrs
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  {/* <div className="hidden md:flex justify-between items-center gap-2"><FaHeart /> {heartCount}</div> */}
                  {isAdmin && (
                    <div className="hidden md:flex justify-between items-center gap-2">
                      <FaRegEye /> {viewers}
                    </div>
                  )}

                  <div className="-my-24 translate-x-4">
                    <Heart
                      size={29}
                      isClick={isClick}
                      onClick={() => {
                        setClick(true);
                        handleSendHeart(channel);
                      }}
                    />
                  </div>
                </div>
              </div>
              <HeartAnimation />

             
            </div>
          </div>

          
        </div>
       
      </div>
    </div>
  );
};

export default Station;
