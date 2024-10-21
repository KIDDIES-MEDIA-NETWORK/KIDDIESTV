"use client";
import { useEffect, useRef, useState } from "react";
import Header from "@/app/components/Header";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Heart from "react-animated-heart";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { sampleComment, sampleData } from "@/app/data/sampleData";
import Image from "next/image";
import Link from "next/link";
import EmojiPicker from "emoji-picker-react";
import { MdEmojiEmotions } from "react-icons/md";
import { FormatDate } from "@/app/utils/FormatDate";

const Live = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isClick, setClick] = useState(false);
  const [newPostComment, setNewPostComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null); 
  const token = false;


  useEffect(() => {
    if (!playerRef.current) {
      setTimeout(() => {
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

        // Listen for video.js player events
        playerRef.current.ready(() => {
          console.log("Video.js player is ready.");
        });

        playerRef.current.on("waiting", () => {
          setLoading(true);
        });

        playerRef.current.on("playing", () => {
          setLoading(false);
        });

        playerRef.current.on("error", (e) => {
          console.error("Video.js error:", e);
          setLoading(true);
        });
      }, 100);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  return (
    <div>
      <div className="fixed z-[100] top-0 w-full">
        <Header />
      </div>
      <div className="">
        <div
        style={{
          backgroundImage:  `url(/assets/png/livebg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="grid grid-cols-9 min-h-screen items-start px-5 md:px-10 md:pt-20"
      >
        <div className="col-span-7">
          <div className="h-[80vh] w-[90%] opacity-1  flex flex-col gap-3 items-center justify-center !rounded-xl  m-auto">
            <video
              ref={videoRef}
              className="video-js vjs-big-play-centered object-cover !border-4 shadow-md !border-white !rounded-xl h-full w-full"
              autoPlay
              playsInline
            />
         
        </div>
        <div className="  bg-primary col-span-2 px-4  shadow-lg w-full">
          <h2 className="text-stroke-top text-[#073168] font-modak text-[28px] py-2 text-center">More Videos</h2>
        <div className=" overflow-x-scroll flex  gap-3 ">
        {sampleData.map((show, index) => (
            <div
              key={index}
              className="relative w-full flex-none h-fit rounded-2xl shadow-lg hover:shadow-xl  transition-transform duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)} 
              onMouseLeave={() => setHoveredCard(null)} 
            >
              {/* Show static image by default, switch to GIF on hover */}
              <Image
                src={hoveredCard === index ? show.gif : show.image}
                alt={show.title}
                height={100}
                width={100}
                loading="eager"
                priority={true}
                className="w-full h-32 object-cover rounded-2xl"
              />
              
              <div className="bg-gradient-to-t from-[#282828] rounded-2xl to-transparent absolute top-0 left-0 w-full h-full"></div>
              <div className="absolute bottom-0 left-0 text-white flex w-full justify-between p-4 items-center mt-2">
                <h3 className="font-sniglet text-base">{show.title}</h3>
              </div>
            </div>
          ))}

        </div>
        </div>
        </div>


        <div className="  bg-[#D0D549] col-span-2 px-4  shadow-lg w-full">
          <h2 className="text-stroke-top text-[#073168] font-modak text-[28px] py-2 text-center">Suggested Videos</h2>
        <div className=" overflow-y-scroll flex flex-col gap-3 h-[80vh]">
        {sampleData.map((show, index) => (
            <div
              key={index}
              className="relative w-full flex-none h-fit rounded-2xl shadow-lg hover:shadow-xl  transition-transform duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)} 
              onMouseLeave={() => setHoveredCard(null)} 
            >
              {/* Show static image by default, switch to GIF on hover */}
              <Image
                src={hoveredCard === index ? show.gif : show.image}
                alt={show.title}
                height={100}
                width={100}
                loading="eager"
                priority={true}
                className="w-full h-32 object-cover rounded-2xl"
              />
              
              <div className="bg-gradient-to-t from-[#282828] rounded-2xl to-transparent absolute top-0 left-0 w-full h-full"></div>
              <div className="absolute bottom-0 left-0 text-white flex w-full justify-between p-4 items-center mt-2">
                <h3 className="font-sniglet text-base">{show.title}</h3>
              </div>
            </div>
          ))}

        </div>
        </div>
        
      </div>
      </div>

      
    </div>
  );
};

export default Live;
