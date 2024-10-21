import { useEffect, useRef, useState } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [images.length]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="relative w-96 h-64 overflow-hidden rounded-lg shadow-lg">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-700 ease-in-out"
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className="w-96 h-64 object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
