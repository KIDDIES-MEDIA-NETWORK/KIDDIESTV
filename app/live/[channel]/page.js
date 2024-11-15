"use client";
import { Metadata } from "@/app/components/Metadata";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "@/app/components/Header";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Heart from "react-animated-heart";
import { sampleComment, channels } from "@/app/data/sampleData";
import Image from "next/image";
import Link from "next/link";
import { FormatDate } from "@/app/utils/FormatDate";
import EmojiPicker from "emoji-picker-react";
import Swiper from "@/app/components/Swiper";
import HeartAnimation from "@/app/components/Heart";
import { useAuth } from "@/app/context/AuthContext";


const Station = ({ params }) => {
  const lastCommentRef = useRef(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setClick] = useState(false);
  const [comments, setComments] = useState([]);
  const [newPostComment, setNewPostComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const token = localStorage.getItem("gpt64");
  const { channel } = params;
  const { email, userInfo, handleSendHeart } = useAuth();


  const scrollToLastComment = () => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };


  const [streamLink, setStreamLink] = useState("");

  useEffect(() => {
    // Fetch channel data using Axios
    const fetchChannel = async () => {
      try {
        const response = await axios.get(
          `https://lkn-kfic.onrender.com/channels/${channel}`
        );
        const { streamLink } = response?.data?.data;
        console.log(response);
        setStreamLink(streamLink);
      } catch (error) {
        console.error("Error fetching channel:", error);
      }
    };

    if (params?.channel) {
      fetchChannel();
    }
  }, [params?.channel]);

  useEffect(() => {
    if (streamLink && !playerRef.current) {
      // Initialize Video.js player with the fetched stream link
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        preload: "auto",
        fluid: true,
        sources: [{ src: streamLink, type: "application/x-mpegURL" }],
      });

      playerRef.current.on("waiting", () => setLoading(true));
      playerRef.current.on("playing", () => setLoading(false));
      playerRef.current.on("error", (e) => {
        console.error("Video.js error:", e);
        setLoading(true);
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [streamLink]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://lkn-kfic.onrender.com/api/comments/${channel}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(response?.data?.data || []);
      scrollToLastComment();

    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };


  const createComment = async () => {
    if (newPostComment.trim() === "") return;
    const body = {
      text:newPostComment,
      userId: userInfo._id,
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        `https://lkn-kfic.onrender.com/api/comments/${channel}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        }
      );
      console.log(res);

      setIsLoading(false);
      if (!res?.data?.success) return

      if (res?.data?.success) {
        setNewPostComment(""); // Clear the comment input
        fetchComments().then(() => {
          // Scroll to the last comment after comments are fetched
          scrollToLastComment();
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
     
    }
  }

  useEffect(() => {
    // Fetch all comments on initial load

    if (channel) {
      fetchComments();
    }
  }, [channel, token ]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter action (new line in input)
      createComment(); // Send the comment
    }
  };


  return (
    <div>
      <div className="fixed z-[100] top-0 w-full">
        <Header />
      </div>
      <div className="md:grid grid-cols-11">
        <div className=" pt-20 bg-[#D0D549] hidden md:block col-span-2 px-4  shadow-lg w-full">
          <h2 className="text-stroke-top text-[#073168] font-modak text-[28px] py-2 text-center">
            Other Channels
          </h2>
          <div className=" overflow-y-scroll flex flex-col gap-3 h-[78vh] rounded-xl">
            {channels.map((item, index) => (
              <Link
                href={item?.slug}
                key={index}
                className="relative w-full flex-none h-40 rounded-2xl shadow-lg hover:shadow-xl  transition-transform duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Show static image by default, switch to GIF on hover */}
                {hoveredCard === index ? (
                  // Conditionally render video or image based on the file type of montage
                  item.montage.endsWith(".mp4") ? (
                    <video
                      src={item.montage}
                      className="rounded-2xl h-full group-hover:shadow-md  object-cover group-hover:shadow-slate-600 transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                      autoPlay
                      loop
                      muted
                    />
                  ) : (
                    <Image
                      src={item.montage}
                      width={500}
                      height={500}
                      className="rounded-2xl bg-[#EDFFAF] p-5 h-full group-hover:shadow-md transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                      alt={`${item.channel} montage`}
                    />
                  )
                ) : (
                  <Image
                    src={item.icon}
                    width={500}
                    height={500}
                    className="rounded-2xl bg-[#EDFFAF] p-5 h-full group-hover:shadow-md transition-transform duration-300 ease-in-out transform object-c over group-hover:scale-105"
                    alt={`${item.channel} icon`}
                  />
                )}

                <div className="bg-gradient-to-t from-[#28282881] rounded-2xl to-transparent absolute top-0 left-0 w-full h-full"></div>
                <div className="absolute bottom-0 left-0 text-white flex w-full justify-between p-4 items-center mt-2">
                  <h3 className="font-sniglet text-base text-black">
                    {item.channel}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            backgroundImage: `url(/assets/png/livebg.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="md:grid grid-cols-9 col-span-9 min-h-screen items-start sm:px-5 md:px-10 md:pt-24"
        >
          <div className="col-span-6 pt-16 md:pt-0">
            <div className="relative h-full md:w-[90%]   flex flex-col gap-3 items-center justify-center md:rounded-xl  m-auto ">
              <video
                ref={videoRef}
                className="video-js  vjs-default-skin player_236158168-dimensions vjs-controls-enabled vjs-workinghover vjs-v7 vjs-live vjs-has-started vjs-paused vjs-user-inactive vjs-tech vjs-big-play-centered object-cover md:rounded-xl h-full w-full absolute inset-0"
                autoPlay
                playsInline
              />
              <HeartAnimation />

                <Swiper />
            </div>
          </div>

          <div className="col-span-3">
            <h1 className="font-modak font-bold text-4xl hidden md:block text-center text-stroke text-[#073168]">
              Live Comments
            </h1>
            <div className=" bg-[#edffaf] relative  md:rounded-xl shadow-lg font-sniglet">
              <p className=" py-3 md:py-5  px-5 border-b-2 text-2xl text-stroke-top   font-modak">
                Top Chat
              </p>
              <div className="relat ive">
                {/* {!token && (
                  <div className="absolute z-[90] w-full top-0 left-0 px-5 py-4 text-center gap-3 flex flex-col items-center justify-center bg-[#fff] shadow-md">
                    <div className="font-sniglet flex gap-2">
                      <Image
                        src="/assets/png/notallow.png"
                        className="animate-pulse"
                        width={30}
                        height={30}
                        alt="not allowed"
                      />
                      <p className="text-xl font-sniglet">
                        You are not logged in
                      </p>
                    </div>
                    <small>
                      Kindly{" "}
                      <Link
                        href="/auth/login"
                        className="text-primary text-lg underline "
                      >
                        login
                      </Link>{" "}
                      to be able to comment
                    </small>
                  </div>
                )} */}
                <div className="flex sm:static flex-col gap-3 h-[45vh] sm:max-h-[50vh] fixed bottom-24 w-full sm:w-full bg-[#edffaf]  overflow-y-scroll pt-5 px-5 ">
                  {comments?.length === 0 && (<div>No comment added yet</div>)}
                  {comments?.map((item, index) => (
                    <div
                      key={index}
                      ref={index === comments.length - 1 ? lastCommentRef : null} // Attach the ref to the last comment
                      className="grid grid-cols-10 items-center place-items-between"
                    >
                      <Image
                        className="col-span-1"
                        src={item.imageSrc || "/assets/png/profiledefault.png"}
                        width={20}
                        height={20}
                        alt="user profile icon"
                      />
                      <div className="col-span-7 flex-col flex">
                        <p className="text-primary font-medium  pr-2">
                          {item?.user?.username}
                        </p>
                        <p>{item?.text}</p>
                      </div>
                      <div className="col-span-2">
                        <small>{FormatDate(item.createdAt)} <span className="hidden md:inline">ago</span></small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full px-5 flex items-center justify-between rea fixed bottom-0 bg-[#edffaf] md:static">
                  <input
                    disabled={isLoading || !token}
                    value={newPostComment}
                    onChange={(e) => setNewPostComment(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type and press enter..."
                    className="w-full disabled:cursor-not-allowed disabled:opacity-30 resize-none focus:outline-none bg-[#b7b7b7] focus:bg-[#f1f1f1]  rounded-full px-3 py-2 placeholder:animate-pulse placeholder:text-[#505050] text-black"
                  />
                  <Heart
                    size={29}
                    isClick={isClick}
                    onClick={handleSendHeart}
                  />
                  <div
                    className=" cursor-pointer"
                    onClick={() => setShowEmoji(!showEmoji)}
                  >
                    <picture>
                      <Image
                        src="/assets/png/smile.webp"
                        alt="😀"
                        width="40"
                        height="40"
                      />
                    </picture>
                  </div>
                  {showEmoji && (
                    <div className="text-sm absolute z-10   top-0 right-0 md:right-0">
                      <EmojiPicker
                        onEmojiClick={(data, e) => {
                          let sym = data.unified.split("-");
                          let codesArray = [];
                          sym.forEach((el) => codesArray.push("0x" + el));
                          let emoji = String.fromCodePoint(...codesArray);
                          setNewPostComment(
                            (prevComment) => prevComment + emoji
                          );
                        }}
                        previewConfig={{ showPreview: false }}
                        size={14}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Station;
