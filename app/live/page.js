"use client";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Heart from "react-animated-heart";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { sampleComment, sampleData } from "../data/sampleData";
import Image from "next/image";
import { FormatDate } from "../utils/FormatDate";
import EmojiPicker from "emoji-picker-react";
import { MdEmojiEmotions } from "react-icons/md";

const Live = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isClick, setClick] = useState(false);
  const [newPostComment, setNewPostComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null); // State for the selected card dropdown


  useEffect(() => {
    if (!playerRef.current) {
      setTimeout(() => {
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: true,
          preload: "auto",
          fluid: true,
          sources: [
            {
              src: "https://zkpywpmblbeg-hls-live.5centscdn.com/LOVEWORLDKIDDIES/7cd9d740a2b7ea3e70246ab8245b8325.sdp/playlist.m3u8",
              type: "application/x-mpegURL",
            },
          ],
        });

        // Listen for video.js player events
        playerRef.current.ready(() => {
          console.log("Video.js player is ready.");
        });

        playerRef.current.on("waiting", () => {
          setLoading(true);
        });

        playerRef.current.on("playing", () => {
          setLoading(false);
        });

        playerRef.current.on("error", (e) => {
          console.error("Video.js error:", e);
          setLoading(true);
        });
      }, 100);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  return (
    <div>
      <div className="fixed z-[100] top-0 w-full">
        <Header />
      </div>
      <div className="grid grid-cols-11">
        <div className=" pt-24 bg-[#D0D549] col-span-2 px-4  shadow-lg w-full">
          <h2 className="text-stroke text-primary font-modak text-2xl text-center">Suggested Videos</h2>
        <div className=" overflow-y-scroll flex flex-col gap-3 h-[80vh]">
        {sampleData.map((show, index) => (
            <div
              key={index}
              className="relative w-full flex-none h-fit rounded-2xl shadow-lg hover:shadow-xl  transition-transform duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)} 
              onMouseLeave={() => setHoveredCard(null)} 
            >
              {/* Show static image by default, switch to GIF on hover */}
              <Image
                src={hoveredCard === index ? show.gif : show.image}
                alt={show.title}
                height={100}
                width={100}
                loading="eager"
                priority={true}
                className="w-full h-40 object-cover rounded-2xl"
              />
              
              <div className="bg-gradient-to-t from-[#282828] rounded-2xl to-transparent absolute top-0 left-0 w-full h-full"></div>
              <div className="absolute bottom-0 left-0 text-white flex w-full justify-between p-4 items-center mt-2">
                <h3 className="font-sniglet text-base">{show.title}</h3>
              </div>
            </div>
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
        className="grid grid-cols-9 col-span-9 min-h-screen items-start px-5 md:px-10 md:pt-28"
      >
        <div className="col-span-6">
          <div className="h-[80vh] w-[90%] opacity-1  flex flex-col gap-3 items-center justify-center !rounded-xl  m-auto">
            <video
              ref={videoRef}
              className="video-js vjs-big-play-centered object-cover !border-4 shadow-md !border-white !rounded-xl h-full w-full"
              autoPlay
              playsInline
            />
          <div className="bg-[#3aa2a8] shadow-lg pt-4 rounded-2xl  flex flex-col gap-2">
          <div className="flex gap-3 items-center px-5">
            <p className="bg-red-800 font-semibold text-white px-3 py-1.5 rounded-full font-nunito animate-pulse">on now</p>
            <p className="bg-orange text-white px-3 py-1.5 font-nunito rounded-full">13M+ watching</p>
          </div>
          <div className="px-5">
            <h3 className="text-2xl text-white font-sniglet">{sampleData[0].title}</h3>
            <small className=" text-slate-400">{sampleData[0]?.starts}</small>
          </div>
          <p className="font-sniglet text-white px-5">{sampleData[0]?.description}</p>
          <div className="flex items-center gap-2 text-orange bg-[#282828] px-5 py-3 rounded-b-2xl"> Up next:
            <p className="font-sniglet text-white text-lg "> {sampleData[1]?.title}</p>
          </div>
          </div>
        </div>
        </div>



        <div className="col-span-3 ">
          <h1 className="font-modak font-bold text-5xl text-center text-stroke text-[#073168]">
            Live Comments
          </h1>
          <div className=" bg-[#edffaf] relative  rounded-xl shadow-lg font-sniglet">
            <p className=" py-5 px-5 border-b-2 text-2xl text-stroke-top   font-modak">Top Chat</p>
            <div>
              <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-scroll pt-5 px-5 ">
                {sampleComment?.map((item, index) => (
                  <div key={index} className="grid grid-cols-10 items-center place-items-between">
                    <Image
                      className="col-span-1"
                      src={item.imageSrc}
                      width={20}
                      height={20}
                      alt="user profile icon"
                    />
                    <div className="col-span-7">
                      <p className="text-orange font-medium float-left pr-2">{item.name}</p>
                      <p>{item?.comment}</p>
                    </div>
                    <div className="col-span-2">
                      <small>{FormatDate(item.created_at)}</small>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full px-5 flex items-center justify-between">
                <input
                  value={newPostComment}
                  onChange={(e) => setNewPostComment(e.target.value)}
                  placeholder="Type and press enter..."
                  className="w-full resize-none focus:outline-none bg-[#b7b7b7] focus:bg-[#f1f1f1]  rounded-full px-3 py-2 placeholder:animate-pulse placeholder:text-[#505050] text-black"
                />
                <Heart
                  size={29}
                  isClick={isClick}
                  onClick={() => setClick(!isClick)}
                />
                <div
                  className="relative cursor-pointer"
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
                        setNewPostComment((prevComment) => prevComment + emoji);
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

export default Live;
