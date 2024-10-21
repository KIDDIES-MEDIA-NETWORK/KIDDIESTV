"use client";
import Image from "next/image";
import Header from "@/app/components/Header";
import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@/app/globals.css";

// Importing icons
import { images, sampleData } from "@/app/data/sampleData";
import Slider from "@/app/components/Slider";
import Footer from "@/app/components/Footer";
import { FaCirclePlay } from "react-icons/fa6";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Carousel from "../components/Carousel";

export default function Home() {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true); 

 

  return (
    <div className="">
      <div className="">
        <div className="fixed z-[100] top-0 w-full">
          <Header />
        </div>

       <div className="">
        <video
                  src="/video/Lkn_video.mp4"
                  autoPlay
                  loop
                  muted
                  alt="video card1"
                  className="h-screen brightness-[0.3] float-right object-cover w-[100%]"
                  height={300}
                  width={300}
                />   
                <div className="absolute   z-[10] font-sniglet  text-white flex flex-col justify-center gap-10 items-center   h-screen right-[50%] text-center translate-x-[50%]">
                  <div className=" bg-whit py-4 px-3 rounded-xl flex items-center flex-col ">
                  
                    <h3 className="text-8xl font-jua text-stroke font-bold ">The Home for all Kids</h3>
                    <h3 className="text-4xl font-jua text-[#F8DD2D] text- ">Loveworld Kiddies Network</h3>
                    <p className="italic">...all channels... one network</p>

                    <Link href="/channels" className="bg-[#fff] shadow-xl border-2 border-orange  text-black  rounded-full pr-12 pl-5 mt-4   text-2xl text-center flex items-center mx-auto ">
                    <p className="w-40 -ml-12 -mr-10 text-center">
                      <DotLottieReact
                        src="/assets/svgs/PlayAnimation.json"
                        loop
                        autoplay
                        className="fill-black"
                        color="black"
                      />
    </p> <p className="text-primary font-bold">Watch Live</p></Link>
                  </div>

                  <div className="mt-10">
                    <Carousel images={images}/>
                  </div>
                </div> 
        </div>
      </div>

      {/* New feature starts here: Slider */}
      <div
        className={`mt-10 bg-gradient-to-t from-[#e4e2f2] to-white`}
      >
        <h2 data-aos="fade-top" className="text-4xl text-center font-bold font-nunito text-primary">
          Featured Programs
        </h2>
        <p data-aos="fade-top" className="font-sniglet text-center ">
          Glance through our most captivating programs and shows
        </p>
        <Slider />
      </div>
      {/* End of new feature */}

      <Footer />
    </div>
  );
}
