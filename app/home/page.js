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
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
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
          <Image
            src="/assets/png/bgreal.png"
            layout="fill"
            className="brightness-[0.8] "
            alt="background"
          />
          <video
            src="/video/Lkn_video.mp4"
            autoPlay
            loop
            muted
            alt="video card1"
            className=" md:mt-48 brightness-[0.2] float-none m-auto rounded-3xl object-cover w-[72%] h-[30rem]"
            height={300}
            width={300}
          />
          <div className="absolute top-20  z-[10] font-sniglet  text-white flex flex-col justify-center items-center  h-screen right-[50%] text-center translate-x-[50%]">
            <div className=" px-10 py-10 bg-gradient-to-t from-[#2E212981] to-[#2E212981] shadow-md rounded-xl flex items-center flex-col ">
              <h3 className="text-7xl font-jua text-stroke-heading font-bold text-white ">
                A Home <br />
                for every Child
              </h3>
              <h3 className="text-4xl font-bold font-jua text-[#F8DD2D] text- ">
                Loveworld Kiddies Network
              </h3>
              {/* <p className="italic">...all channels... one network</p> */}

              <Link
                href="/channels"
                className="bg-gradient-to-t from-[#bc7d5b] to-[#ffb48d]  shadow-xl border-2    rounded-full pr-12 pl-5 mt-4   text-2xl text-center flex items-center mx-auto "
              >
                <p className="w-40 -ml-12 fill-slate-500 -mr-10 text-center">
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

            <div className="mt-">
              <Carousel images={images} />
            </div>
          </div>
        </div>
      </div>

      {/* New feature starts here: Slider */}
      <div className={`mt-10 bg-gradient-to-t from-[#e4e2f2] to-white`}>
        <h2
          data-aos="fade-top"
          className="text-4xl text-center font-bold font-nunito text-primary"
        >
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
