"use client";
import React, { useState, useEffect } from "react";
import "@/app/globals.css";
import Header from "../components/Header";
import { channels } from "../data/sampleData";
import Image from "next/image";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MdAdd } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";

const Channels = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [heartCounts, setHeartCounts] = useState({}); // Store heart counts for each channel
  const [commentCounts, setCommentCounts] = useState({}); // Store heart counts for each channel
  const { fetchHeartCount, fetchChannel  } = useAuth(); // Access fetchHeartCount function from context

  // Fetch heart count for each channel
  useEffect(() => {
    const fetchAllHeartCounts = async () => {
      const counts = {};
      const countsCom = {};
      for (const channel of channels) {
        const count = await fetchHeartCount(channel.slug); // Use the slug as channelId
        const res = await fetchChannel(channel.slug); // Use the slug as channelId
        // console.log(res)
        counts[channel.slug] = count;
        countsCom[channel.slug] = res.length;
        setChannelSlug(channel.slug)
         // Store heart count by channel slug
        }
        setHeartCounts(counts); // Set the heart counts in state
        setCommentCounts(countsCom); // Set the heart counts in state
    };

    fetchAllHeartCounts(); // Fetch heart counts when the component mounts
  }, [fetchHeartCount]);

  // console.log(commentCounts)

  return (
    <div
      className="bg-gradi ent-to-t font-sniglet from-[#bc7d 5b81] to-[#ffb48 d81] min-h-screen"
      style={{
        backgroundImage: `url(/assets/png/channelbg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="fixed z-[100] top-0 w-full">
        <Header />
      </div>

      <div
        style={{
          backgroundImage: `url(/assets/png/livebg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="pb-20 md:pt-32 pt-20 z-[10000] md:px-24"
      >
        <div className="">
          <h2 className="text-2xl text-center md:text-left font-semib old capitalize md:text-3xl font-lucky text-[#ddd] m d:text-gray-900  mb-3">
            My favorites
          </h2>
          <div className="flex gap-x-4 gap-y-12 w-full flex-wrap items-center justify-center md:justify-start">
            {channels.slice(1, 3).map((item, index) => (
              <Link
                href={`/live/${item?.slug}`}
                className="relative h-full md:h-44 w-80 md:w-60 group flex-shrink-0"
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index ? (
                  item.montage.endsWith(".mp4") ? (
                    <video
                      src={item.montage}
                      className="rounded-xl h-72 w-80 md:w-full md:h-full object-cover group-hover:shadow-lg transition-transform duration-300 transform group-hover:scale-105"
                      autoPlay
                      loop
                      muted
                    />
                  ) : (
                    <Image
                      src={item.montage}
                      width={500}
                      height={500}
                      className="rounded-xl bg-slate-900 p-5 h-72 w-80 md:w-full md:h-full object-contain group-hover:shadow-lg transition-transform duration-300 transform group-hover:scale-105"
                      alt={`${item.channel} montage`}
                    />
                  )
                ) : (
                  <Image
                    src={item.image || item.icon}
                    width={500}
                    height={500}
                    className={`rounded-xl bg-slate-900  h-72 w-80 md:w-full md:h-full ${
                      item?.image ? "object-cover" : "object-contain"
                    } group-hover:shadow-lg transition-transform duration-300 transform group-hover:scale-105`}
                    alt={`${item.channel} icon`}
                  />
                )}
                <p className="text-xl mt-2 text-center">{item.channel}</p>
                {hoveredIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="w-40 text-center">
                      <DotLottieReact
                        src="/assets/svgs/lottie.json"
                        loop
                        autoplay
                      />
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-semib old text-center md:text-left font-lucky text-[#DDDDDD] m d:text-gray-900 my-3">
            All channels
          </h2>
          <div className="flex gap-x-4 gap-y-12 w-full flex-wrap items-center justify-center md:justify-start">
            {channels.map((item, index) => (
              <Link
                href={`/live/${item?.slug}`}
                className="relative h-full md:h-44 w-80 md:w-60 group flex-shrink-0"
                key={index}
                onMouseEnter={() => setHoveredIndex(index + 3)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index + 3 ? (
                  item.montage.endsWith(".mp4") ? (
                    <video
                      src={item.montage}
                      className="rounded-xl h-72 w-80 md:w-full md:h-full object-cover group-hover:shadow-lg transition-transform duration-300 transform group-hover:scale-105"
                      autoPlay
                      loop
                      muted
                    />
                  ) : (
                    <Image
                      src={item.montage}
                      width={500}
                      height={500}
                      className="rounded-xl bg-slate-900 p-5 h-72 w-80 md:w-full md:h-full object-contain group-hover:shadow-lg transition-transform duration-300 transform group-hover:scale-105"
                      alt={`${item.channel} montage`}
                    />
                  )
                ) : (
                  <Image
                    src={item.image || item.icon}
                    width={500}
                    height={500}
                    className={`rounded-xl bg-slate-900  h-72 w-80 md:w-full md:h-full ${
                      item?.image ? "object-cover" : "object-contain"
                    } group-hover:shadow-lg transition-transform duration-300 transform group-hover:scale-105`}
                    alt={`${item.channel} icon`}
                  />
                )}
                <div  className="text-xl mt-2 text-center flex items-center gap-5">
                  <p>{item.channel}</p>
                  <p className="flex items-center gap-1">
                    <FaHeart color="red" />
                    {heartCounts[item.slug] || 0}
                  </p>
                  <p className="flex items-center gap-1">
                    <FaComments color="#386299" />
                    {commentCounts[item.slug]  || 0}
                  </p>
                </div>
                {hoveredIndex === index + 3 && (
                  <div className="">
                    <div className="absolute top-2 right-2 bg-[#2e80fbaf] text-white text-2xl rounded-full p-1.5">
                      <MdAdd />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="w-40  text-center">
                        <DotLottieReact
                          src="/assets/svgs/lottie.json"
                          loop
                          autoplay
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
