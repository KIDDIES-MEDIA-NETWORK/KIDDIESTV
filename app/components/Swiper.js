"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { carousels } from "../data/sampleData";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const Swiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to the next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carousels.length);
  };

  // Move to the previous image
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carousels.length) % carousels.length
    );
  };

  // Automatically change image every 4 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mt-3 w-full hidden md:block max-w -lg mx-auto overflow-hidden">
      {/* Carousel Images */}
      <div className="relative h-64 w-full sm:h-[10rem]">
        {carousels.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            width={1000}
            height={1000}
            className={`absolute inset-0 w-full h-full rounded-xl object-cover  transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Previous Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2 m-2 hover:bg-opacity-75"
      >
        <SlArrowLeft  size={24}/>
      </button>

      {/* Next Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2 m-2 hover:bg-opacity-75"
      >
        <SlArrowRight size={24}/>
      </button>
    </div>
  );
};

export default Swiper;
