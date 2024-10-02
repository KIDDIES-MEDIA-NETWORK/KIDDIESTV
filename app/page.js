"use client";
import Image from "next/image";
import Header from "./components/Header";
import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
// Importing icons
import { sampleData } from "./data/sampleData";
import Slider from "./components/Slider";
import Footer from "./components/Footer";

export default function Home() {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true); // State to manage loading text
  // const [paused, setPaused] = useState(false); // State to control slider pause on hover
  // const [selectedCard, setSelectedCard] = useState(null); // State for the selected card dropdown

  useEffect(() => {
    if (!playerRef.current) {
      setTimeout(() => {
        playerRef.current = videojs(videoRef.current, {
          controls: false,
          autoplay: true,
          preload: "auto",
          fluid: true,
          sources: [
            {
              src: "https://2nbyjno7d53k-hls-live.5centscdn.com/LOVETOONS/7948b47199c898157470cf861cd0b8d7.sdp/playlist.m3u8", // Path to your HLS stream
              type: "application/x-mpegURL",
            },
          ],
        });

        // Listen for video.js player events to detect when the stream starts playing
        playerRef.current.on("waiting", () => {
          setLoading(true); // Show loading text when buffering or waiting
        });

        playerRef.current.on("playing", () => {
          setLoading(false); // Hide loading text when the stream starts playing
        });

        playerRef.current.on("error", () => {
          setLoading(true); // Show loading if there's an error
        });
      }, 100); // Delay initialization slightly
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="fixed z-[100] top-0 w-full">
          <Header />
        </div>

        <div className="">
          <div className="relative h-full">
            {/* Video with grid overlay */}
            <div className="relative h-full">
              <video
                ref={videoRef}
                className="video-js vjs-default-skin vjs-big-play-centered object-cover w-full h-full"
                autoPlay
                playsInline
                muted
              />
              {/* <div className="wavy"></div> */}
              <div className="absolute top-0 left-0 w-full h-[120vh] pointer-events-none grid-overlay"></div>
            </div>

            {/* Container for animating the button from bottom to top */}
            {/* <div className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center animate-up">
            <div className="px-3 py-2 rounded-full bg-[#eb4c69] shadow-[#4a252b] shadow-md text-white animate-bounce flex items-center gap-3">
              <FaPlayCircle size={30} />
              <Link href={"/live"}>
                {loading ? "Loading live video streaming..." : "Watch LIVE now!"}
              </Link>
            </div>
          </div> */}

            <div className="absolute flex flex-col gap-5 items-start left-10 top-[30%] text-white z-[10]">
              <div className="md:text-5xl sm:text-5xl text-3xl font-bold flex flex-col   stroke-white stroke-2 ">
                <span className="text-3xl font-gloria">Welcome to </span>
                <h1 className="font-nunito font-bold">
                  LOVEWORLD KIDDIES NETWORK
                </h1>
                <span className="text-lg font-gloria">
                  ...where learning about God is always fun{" "}
                </span>
              </div>
              <p className="md:w-[70%] w-full">
                <span className="font-gloria">
                  Enjoy our daily fun, educative and Word-filled videos for your
                  kids. Share this amazing moment with us as we take you through
                  various educational, creative, christian videos that will
                  surely get your kids learning the right things... the right
                  way
                </span>
              </p>

              <div className="flex gap-5 font-gloria">
                <Link
                  href={"/live"}
                  className="bg-gradient-to-b from-[#9C29B2] animate-bounce hover:animate-none to-[#5e086f]  px-3 py-2 rounded-2xl text-white "
                >
                  Watch Live!
                </Link>
                <Link
                  href={"/live"}
                  className="border-[#9C29B2] px-3 py-2 rounded-2xl  text-[#9C29B2]  border-2"
                >
                  Play videos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New feature starts here: Slider */}
      <div className={`${!loading ? "pt-16":"pt-20"} bg-[#e4e2f2]`}>
        <h2 className="text-4xl text-center font-semibold font-nunito">Feature Programs</h2>
        <p className="font-schoolbell text-center ">Glance through our most captivating programs and shows</p>
        <Slider />
      </div>
      {/* End of new feature */}





      <Footer />
    </div>
  );
}
