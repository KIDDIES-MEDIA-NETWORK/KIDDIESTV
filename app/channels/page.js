"use client";
import React, { useState, useEffect } from "react";
import "@/app/globals.css";
import Header from "../components/Header";
import { channels, programs } from "../data/sampleData";
import Image from "next/image";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MdAdd } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";

const Channels = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const [heartCounts, setHeartCounts] = useState({}); // Store heart counts for each channel
  const [commentCounts, setCommentCounts] = useState({}); // Store heart counts for each channel
  const { fetchHeartCount, fetchChannel  } = useAuth(); // Access fetchHeartCount function from context

  // Fetch heart count for each channel
  useEffect(() => {
    const fetchCounts = async () => {
      const heartCountPromises = channels.map(async (channel) => {
        const heartCount = await fetchHeartCount(channel.slug);
        return { slug: channel.slug, heartCount };
      });

      const commentCountPromises = channels.map(async (channel) => {
        const comments = await fetchChannel(channel.slug);
        return { slug: channel.slug, commentCount: comments.length };
      });

      // Resolve all promises for heart counts
      const heartCountsData = await Promise.all(heartCountPromises);
      const heartsObject = heartCountsData.reduce((acc, curr) => {
        acc[curr.slug] = curr.heartCount;
        return acc;
      }, {});

      // Resolve all promises for comment counts
      const commentCountsData = await Promise.all(commentCountPromises);
      const commentsObject = commentCountsData.reduce((acc, curr) => {
        acc[curr.slug] = curr.commentCount;
        return acc;
      }, {});

      setHeartCounts(heartsObject);
      setCommentCounts(commentsObject);
    };

    fetchCounts();
  }, []);

  console.log(heartCounts)

  return (
    <div
      className=" font-sniglet   "
      
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
        className=" md:pb-32 pt-14 z-[10000] md:px-20 min-h-screen"
      >
        <div className="mt-14">
          <h2 className="text-2xl md:text-3xl font-semib old text-center md:text-left font-lucky text-[#fff] m d:text-gray-900 my-3">
            Top Programs
          </h2>
          <div className="flex gap-x-4 md:gap-y-20 gap-y-12 w-full flex-wrap items-center justify-center md:justify-start  lg:grid  lg:grid-cols-5 ">
            {programs.map((item, index) => (
              <Link
                href={`/live/${item?.slug}`}
                className="relative h-full md:h-44 w-80 md:w-60 grou hover:scale-105 flex-shrink-0 hover:shadow-lg shadow-black transition-all duration-500 ease-in-out"
                key={index}
                onMouseEnter={() => setHoveredItem(index + 3)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {hoveredItem === index + 3 ? (
                  item.montage.endsWith(".mp4") ? (
                    <video
                      src={item.montage}
                      className="rounded-t-xl h-72 w-80 md:w-full md:h-full object-cover group-hover:shadow-lg transition-transform duration-300 transform group"
                      autoPlay
                      loop
                      muted
                    />
                  ) : (
                    <Image
                      src={item.montage}
                      width={500}
                      height={500}
                      className="rounded-t-xl bg-slate-900 p-5 h-72 w-80 md:w-full md:h-full object-contain group-hover:shadow-lg transition-transform duration-300 transform "
                      alt={`${item.channel} montage`}
                    />
                  )
                ) : (
                  <Image
                    src={item.image || item.icon}
                    width={500}
                    height={500}
                    className={`rounded-t-xl bg-slate-900  h-72 w-80 md:w-full md:h-full ${
                      item?.image ? "object-cover " : "object-contain"
                    } group-hover:shadow-lg transition-transform duration-300 transform ease-in-out`}
                    alt={`${item.channel} icon`}
                  />
                )}
                {item.premium && (<div className="absolute top-2 right-2 bg-slate-900 text-white text-xs rounded-full px-2 py-2">
                  <Image
                    src="/assets/png/premium.png"
                    width={300}
                    height={300}
                    className={`w-5`}
                    alt={`premium icon`}
                  />
                    </div>)}
                <div  className="text-base px-3 rounded-b-xl py-3 text- flex  flex-col  gap-1 bg-slate-100 ">
                  <p>{item.channel}</p>
                  <div className=" text-xs text-primary gap-2">{item?.episodes} episodes
                  </div>
                </div>
                {hoveredItem === index + 3 && (
                  <div className="">
                    
                    
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
        <div className="mt-36">
          <h2 className="text-2xl md:text-3xl font-semib old text-center md:text-left font-lucky text-[#fff] m d:text-gray-900 my-3">
            All channels
          </h2>
          <div className="flex gap-x-4 md:gap-y-20 gap-y-12 w-full flex-wrap items-center justify-center md:justify-start  lg:grid  lg:grid-cols-5 ">
            {channels.map((item, index) => (
              <Link
                href={`/live/${item?.slug}`}
                className="relative h-full md:h-44 w-80 md:w-60 grou hover:scale-105 flex-shrink-0 hover:shadow-md transition-all duration-500 ease-in-out"
                key={index}
                onMouseEnter={() => setHoveredIndex(index + 3)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index + 3 ? (
                  item.montage.endsWith(".mp4") ? (
                    <video
                      src={item.montage}
                      className="rounded-t-xl h-72 w-80 md:w-full md:h-full object-cover group-hover:shadow-lg transition-transform duration-300 transform group"
                      autoPlay
                      loop
                      muted
                    />
                  ) : (
                    <Image
                      src={item.montage}
                      width={500}
                      height={500}
                      className="rounded-t-xl bg-slate-900 p-5 h-72 w-80 md:w-full md:h-full object-contain group-hover:shadow-lg transition-transform duration-300 transform "
                      alt={`${item.channel} montage`}
                    />
                  )
                ) : (
                  <Image
                    src={item.image || item.icon}
                    width={500}
                    height={500}
                    className={`rounded-t-xl bg-slate-900  h-72 w-80 md:w-full md:h-full ${
                      item?.image ? "object-cover" : "object-contain"
                    } group-hover:shadow-lg transition-transform duration-300 transform ease-in-out`}
                    alt={`${item.channel} icon`}
                  />
                )}
                {!item.live && (<div className="absolute top-2 right-2 bg-[#f7790e] text-white text-xs rounded-full px-2.5 py-1.5">
                      Coming soon
                    </div>)}
                <div  className="text-base px-3 rounded-b-xl py-3 text- flex items-center justify-between gap-1 bg-slate-100 ">
                  <p>{item.channel}</p>
                  <div className="flex text-sm items-center justify-center gap-2">
                  <p className="flex text-sm items-center gap-1">
                    <FaHeart color="#386299" />
                    {heartCounts[item.slug] || 0}
                  </p>
                  <p className="flex text-sm items-center gap-1">
                    <FaComments color="#386299" />
                    {commentCounts[item.slug]  || 0}
                  </p></div>
                </div>
                {hoveredIndex === index + 3 && (
                  <div className="">
                    
                    
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
