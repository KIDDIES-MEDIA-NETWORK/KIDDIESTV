"use client";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Live = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true);

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
              src: "https://zkpywpmblbeg-hls-live.5centscdn.com/LOVEWORLDKIDDIES/7cd9d740a2b7ea3e70246ab8245b8325.sdp/playlist.m3u8", // Path to your HLS stream
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
    <div>
      <div className="fixed z-[100] top-0 w-full">
        <Header />
      </div>
      <div className="grid grid-cols-7 items-center mt-16">
        <div className="col-span-5" style={{
              backgroundImage: `url(/assets/png/image.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}>
          <div className="!h-[80vh] w-[70%] opacity-1 flex items-center justify-center rounded-lg m-auto">
            <video
              ref={videoRef}
              // src="https://zkpywpmblbeg-hls-live.5centscdn.com/LOVEWORLDKIDDIES/7cd9d740a2b7ea3e70246ab8245b8325.sdp/playlist.m3u8"
              // type="application/x-mpegURL"
              className="video-js  vjs-big-play-centered object-cover rounded-lg h-full w-full"
              autoPlay
            />
          </div>
        </div>
        <div className="col-span-2 border-primary border-2 h-[80vh]  "></div>
      </div>
    </div>
  );
};

export default Live;
