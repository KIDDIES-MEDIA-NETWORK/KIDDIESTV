import Image from "next/image";
import { useRef } from "react";

const Carousel = ({ images }) => {
  const sliderRef = useRef(null);

  return (
    <div className="w-full  flex items-center justify-center">
      <div className="relative w-[40%] mx-auto h-fit overflow-hidden ">
        {/* Slider container */}
        <div
          ref={sliderRef}
          className="flex gap-5 items-center w-max animate-slide whitespace-nowrap"
        >
          {images.concat(images).map((image, index) => (
            <Image
            width={100}
            height={100}
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className="w-32 h-fit object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
