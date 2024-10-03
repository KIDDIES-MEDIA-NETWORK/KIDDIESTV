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
import { FaCirclePlay } from "react-icons/fa6";

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

        <div
        className="h-screen grid grid-cols-3 items-center pt-20 px-10"
        style={{
          backgroundImage: `url(/assets/png/section2.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
           <div  data-aos="fade-right"  className="col-span-2 flex flex-col gap-5 items-start pl-10 text-black  z-[10]">
              <div className="md:text-6xl sm:text-5xl text-2xl font-bold flex flex-col   stroke-white stroke-2 ">
                <span className="text-3xl font-gloria">Welcome to </span>
                <h1 className="font-lucky font-extrabold ">
                  LOVEWORLD <br/> KIDDIES NETWORK
                </h1>
                <span className="text-lg font-gloria text">
                  where learning about God is always fun...
                </span>
              </div>
              <p className="md:w-[60%] w-full">
                <span className="font-sniglet ">
                  Enjoy our daily fun, educative and Word-filled videos for your
                  kids. Share this amazing moment with us as we take you through
                  various educational, creative, christian videos that will
                  surely get your kids learning the right things... the right
                  way
                </span>
              </p>

              <div className="flex gap-5 font-sniglet">
                <Link
                  href={"/live"}
                  className="bg-gradient-to-t flex items-center gap-2 from-[#9C29B2] animate-bounce hover:animate-none to-[#9C29B2]  px-3 py-2 rounded-2xl text-[#fff] "
                >
                  <FaCirclePlay/> Watch Live
                </Link>
                <Link
                  href={"/live"}
                  className="border-[#9C29B2] px-3 py-2 rounded-2xl  text-[#9C29B2]  border-2"
                >
                  Play videos
                </Link>
              </div>
            </div>

            <div className="relative flex flex-col items-end gap-5 z-[100000]">
              <div className="flex gap-5">

              <div className=" bottom-0 right-0 w-64 h-52">
                <Image src="/assets/png/Layer1.png" alt="video card1" className="h-full w-full" height={500} width={500} />
              </div>
              <div className=" top-0 w-64 h-52">
                <Image src="/assets/png/Layer2.png" alt="video card2" height={500} width={500} />
              </div>

              </div>
              <div className=" bottom-0 w-64 h-52">
                <Image src="/assets/png/Layer3.png" alt="video card3" height={500} width={500} />
              </div>
            </div>
        </div>
      </div>

      {/* New feature starts here: Slider */}
      <div className={`${!loading ? "pt-16":"pt-20"} bg-gradient-to-t from-[#e4e2f2] to-white`}>
        <h2 className="text-4xl text-center font-bold font-nunito text-primary">Featured Programs</h2>
        <p className="font-schoolbell text-center ">Glance through our most captivating programs and shows</p>
        <Slider />
      </div>
      {/* End of new feature */}





      <Footer />
    </div>
  );
}
