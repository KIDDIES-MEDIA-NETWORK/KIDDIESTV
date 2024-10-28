"use client";
import React, { useState } from "react";
import "@/app/globals.css";
import Header from "../components/Header";
import { channels } from "../data/sampleData";
import Image from "next/image";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MdAdd } from "react-icons/md";
const Channels = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-gradient-to-t font-sniglet bg-opacity-50 from-[#bc7d5b81] to-[#ffb48d81] min-h-screen">
      <Header />

      <div className="pb-20 pt-10 px-24">
        <div>
          <h2 className="text-3xl mb-3">Continue watching...</h2>
          <div className="flex flex-wrap gap-5">
            {channels.slice(1, 3).map((item, index) => (
              <Link
                href={`/live/${item.channel}`}
                className="relative h-44 w-80 group"
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Image
                  src={hoveredIndex === index ? item.montage : item.icon}
                  width={500}
                  height={500}
                  className="rounded-2xl bg-slate-900 p-5 group-hover:shadow-md  h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                  alt={`${item.channel} icon`}
                />
                <p className="text-xl mt-2 text-center">{item.channel}</p>
                {hoveredIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="w-40 -ml-12 fill-slate-500 -mr-10 text-center">
                      <DotLottieReact
                        src="/assets/svgs/lottie.json"
                        loop
                        autoplay
                        className=""
                        color="black"
                      />
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl my-3">All channels</h2>
          <div className="flex flex-wrap gap-y-10 gap-x-4">
            {channels.map((item, index) => (
              <Link
                href={`/live/${item.channel}`}
                className="relative h-44 w-80 group"
                key={index}
                onMouseEnter={() => setHoveredIndex(index + 3)} // Distinguish from Continue Watching indexes
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Image
                  src={hoveredIndex === index + 3 ? item.montage : item.icon}
                  width={500}
                  height={500}
                  className="rounded-2xl bg-slate-900 p-5  h-full transition-transform duration-300 ease-in-out transform group-hover:shadow-lg group-hover:scale-105"
                  alt={`${item.channel} icon`}
                />
                <p className="text-xl mt-2 text-center">{item.channel}</p>
                {hoveredIndex === index + 3 && (
                  <div className="">
                  <div className="absolute top-2 right-2 bg-[#2e80fbaf] text-white text-2xl rounded-full p-1.5">
                    <MdAdd/>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                  <p className="w-40 -ml-12 fill-slate-500 -mr-10 text-center">
                    <DotLottieReact
                      src="/assets/svgs/lottie.json"
                      loop
                      autoplay
                      className=""
                      color="black"
                    />
                  </p>
                </div>
                </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
