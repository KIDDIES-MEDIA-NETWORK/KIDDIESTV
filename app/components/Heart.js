import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Framer Motion for animation
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAuth } from '../context/AuthContext';


const HeartAnimation = () => {
  const {hearts, setHearts, addHeart, handleSendHeart} = useAuth();

  // const addHeart = () => {
  //   const newHeart = {
  //     id: Date.now(),
  //     left: `${Math.random() * 80 + 10}%`, // Random position along the x-axis
  //   };
  //   setHearts([...hearts, newHeart]);

  //   // Remove heart after animation completes (e.g., 3s)
  //   setTimeout(() => {
  //     setHearts((hearts) => hearts.filter((heart) => heart.id !== newHeart.id));
  //   }, 3000);
  // };

  return (
    <div className="relative w-full h-full">
      {/* <button
        onClick={addHeart}
        className="absolute bottom-14 right-4 bg-pink-500 p-2 rounded-full"
      >
        ❤️
      </button> */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0, x: 170 }}
            exit={{ opacity: 0, y: -400 }}
            className="absolute text-red-500 right-0  bottom-4 "
            // style={{ left: heart.left }}
          >
            
            <DotLottieReact
                    src="/video/heartanimation.json"
                    loop
                    autoplay
                    className=""
                    color="black"
                  />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeartAnimation;
