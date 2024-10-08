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

  const WebpData = [
    {
      id: 0,
      ImageSrc: "/assets/video/treasure-hunt.webp",
    },
    {
      id: 1,
      ImageSrc: "/assets/video/treasure-hunt.webp",
    },
    {
      id: 2,
      ImageSrc: "/assets/video/tick-talk.webp",
    },
    {
      id: 3,
      ImageSrc: "/assets/video/basic-knowledge.webp",
    },
  ];

  return (
    <div className="">
      <div className="">
        <div className="fixed z-[100] top-0 w-full">
          <Header />
        </div>

        <div
          className="h-screen grid grid-cols-2 items-center place-content-center place-items-end px-10"
          style={{
            backgroundImage: `url(/assets/png/section2.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            
            className="col-span-1 md:mt-10 flex flex-col gap-5 items-start pl-10 text-black  z-[10]"
          >
            <div className="md:text-7xl sm:text-5xl text-2xl font-bold flex flex-col   stroke-white stroke-2 ">
              <span className="text-3xl font-gloria">Welcome to </span>
              <h1 className="font-lucky font-extrabold text-[#073168]  text-stroke drop-shadow-lg ">
                LOVEWORLD <br /> KIDDIES NETWORK
              </h1>
              <span className="text-lg font-gloria text">
                where learning about God is always fun...
              </span>
            </div>
            <p className="md:w-[70%] w-full">
              <span className="font-sniglet text-lg">
                Enjoy our daily fun, educative and Word-filled videos for your
                kids. Share this amazing moment with us as we take you through
                various educational, creative, christian videos that will surely
                get your kids learning the right things... the right way
              </span>
            </p>

            <div className="flex gap-5 font-sniglet">
              <Link
                href={"/live"}
                className="bg-gradient-to-t flex items-center gap-2 from-[#9C29B2] animate-bounce hover:animate-none to-[#9C29B2]  px-3 py-2 rounded-2xl text-[#fff] "
              >
                <FaCirclePlay /> Watch Live
              </Link>
              <Link
                href={"/live"}
                className="border-[#9C29B2] px-3 py-2 rounded-2xl  text-[#9C29B2]  border-2"
              >
                Play videos
              </Link>
            </div>
          </div>

          <div  className="col-span-1 h-full grid-cols-2 grid gap-11 w-full z-[10]">
            <div className="relative  ">
              <div className=" absolute z-0  w-96 h-64">
                <video
                  src="/video/Lkn_video.mp4"
                  autoPlay
                  loop
                  muted
                  alt="video card1"
                  className="h-full object-cover w-full"
                  height={300}
                  width={300}
                />
              </div>
              <div className="z-[1000] absolute w-[390px] h-auto">
                <Image
                  src="/assets/png/Layer1.png"
                  alt="video card1"
                  className="h-full w-full"
                  height={500}
                  width={500}
                />
              </div>
            </div>

            <div className="relative ">
              <div className=" absolute z-0  w-80 h-52">
                <Image
                  src="/video/super-squad.webp"
                  alt="video card1"
                  className="h-full object-cover w-full"
                  height={300}
                  width={300}
                />
              </div>
              <div className="z-[1000] absolute w-80 h-auto">
                <Image
                  src="/assets/png/Layer1.png"
                  alt="video card1"
                  className="h-full w-full"
                  height={500}
                  width={500}
                />
              </div>
            </div>

            <div className="relative ">
              <div className="z-[1000] absolute right-0 -rotate-12 w-52 h-auto">
                <Image
                  src="/assets/png/nico.png"
                  alt="video card1"
                  className="h-full w-full"
                  height={500}
                  width={500}
                />
              </div>
            </div>

            <div className="relative 4thlayer ">
              <div className=" absolute z-0 left-0  w-[22rem] h-60">
                <Image
                  src="/video/tick-talk.webp"
                  alt="video card1"
                  className="h-full object-cover w-full"
                  height={300}
                  width={300}
                />
              </div>
              <div className="z-[1000] absolute left-0 w-[22rem] h-auto">
                <Image
                  src="/assets/png/Layer1.png"
                  alt="video card1"
                  className="h-full w-full"
                  height={500}
                  width={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New feature starts here: Slider */}
      <div
        className={`pt-8 bg-gradient-to-t from-[#e4e2f2] to-white`}
      >
        <h2 className="text-4xl text-center font-bold font-nunito text-primary">
          Featured Programs
        </h2>
        <p className="font-sniglet text-center ">
          Glance through our most captivating programs and shows
        </p>
        <Slider />
      </div>
      {/* End of new feature */}

      <Footer />
    </div>
  );
}
