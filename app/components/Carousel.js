import Image from "next/image";
import { useRef, useEffect } from "react";

const Carousel = ({ images }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;
    const scrollWidth = slider.scrollWidth / 2; // Total scrollable width (since images are duplicated)

    const startScroll = () => {
      if (scrollAmount >= scrollWidth) {
        scrollAmount = 0; // Reset scroll to start when reaching the end
      } else {
        scrollAmount += 1; // Increment scroll amount to move the slider left
      }
      slider.style.transform = `translateX(-${scrollAmount}px)`;
    };

    const interval = setInterval(startScroll, 10); // Adjust the speed here

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className="relative w-[60%] xl:w-[40%] mx-auto h-fit overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 25%, black 75%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 25%, black 75%, transparent)",
        }}
      >
        {/* Slider container */}
        <div
          ref={sliderRef}
          className="flex gap-8 items-center w-max whitespace-nowrap"
          style={{ display: "inline-flex" }}
        >
          {images.concat(images).map((image, index) => (
            <Image
              width={100}
              height={100}
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className="w-36 xl:w-24 h-fit object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
