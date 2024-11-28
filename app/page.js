"use client";
import Image from "next/image";
import Header from "@/app/components/Header";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "video.js/dist/video-js.css";
import "@/app/globals.css";
import FamFriendly from "@/app/components/FamFriendly";
import Devices from "@/app/components/Devices";
// Importing icons
import { images } from "@/app/data/sampleData";
import Footer from "@/app/components/Footer";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Carousel from "@/app/components/Carousel";

export default function Home() {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#CCCAC4]">
      <div className="">
        <div className="fixed z-[100] top-0 w-full">
          <Header />
        </div>

        <div className="relative">
          <Image
            src="/assets/png/emptybg.png"
            width={3000}
            height={3000}
            className="brightne ss-[0.8] hidden md:block object- w-full h-screen"
            alt="background"
          />
          <Image
            src="/assets/png/tab.png"
            width={1000}
            height={1000}
            className="static w-[100%] h-[100%] hidden  md:absolute top-0 md:flex items-center justify-center"
            alt="background"
          />
          <video
            src="/video/Lkn_video.mp4"
            autoPlay
            loop
            muted
            alt="video card1"
            className="static md:absolute mt-10 top-0  md:mt-0 md:top-44 lg:top-[32vh] xl:top-[32vh] 2xl:top-40 flex flex-col justify-center items-center md:right-[50%] text-center md:translate-x-[50%] brightness-[0.3] float-none m-auto md:rounded-3xl object-cover w-full md:w-[69%] md:h-[68vh]"
            height={300}
            width={300}
          />
          <div className="absolute top-0 sm:top-16 md:top-16 xl:top-16 z-[10] font-sniglet  text-white flex flex-col justify-center items-center w-full  md:h-screen right-[50%] text-center translate-x-[50%]">
            <div className=" px-10 py-5 xl:py-0   rounded-xl flex items-center flex-col ">
              <h3 className="text-2xl  sm:text-4xl md:text-7xl font-jua text-stroke-heading font-bold text-white ">
                A Home <br />
                for every Child
              </h3>
              <h3 className="text-xl sm:text-3xl md:text-4xl sm:font-bold font-jua text-[#F8DD2D] text- ">
                Loveworld Kiddies Network
              </h3>

              <Link
                href="/channels"
                className="bg-gradient-to-t from-[#bc7d5b] to-[#ffb48d]  shadow-xl border-2  py-0.5 sm:py-0  rounded-full pr-7 md:pr-12 pl-5 sm:mt-4 mt-2  text-md md:text-2xl text-center flex items-center mx-auto "
              >
                <p className="md:w-40 w-20 md:-ml-12 -ml-6 fill-slate-500 md:-mr-10 -mr-5 text-center">
                  <DotLottieReact
                    src="/assets/svgs/lottie.json"
                    loop
                    autoplay
                    className=""
                    color="black"
                  />
                </p>{" "}
                <p className="text-[#282828] font-bold">Watch Live</p>
              </Link>
            </div>

            <div className="w-full hidden md:block">
              <Carousel images={images} />
            </div>
          </div>
        </div>
      </div>

      <FamFriendly />
      <Devices />
      <Footer />
    </div>
  );
}
