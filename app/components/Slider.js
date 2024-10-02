import {useState} from 'react'
import { sampleData } from '../data/sampleData';
import Image from 'next/image';
import { FaBell, FaChevronDown } from "react-icons/fa";

const Slider = () => {
    // const [loading, setLoading] = useState(true); // State to manage loading text
  const [paused, setPaused] = useState(false); // State to control slider pause on hover
  const [selectedCard, setSelectedCard] = useState(null); // State for the selected card dropdown
  return (
    <div
        className={` w-[90vw] rounded-lg  mt-5  mx-auto overflow-hidden ${paused ? "" : "animate-scroll"} font-gloria `}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex space-x-6"
          style={{
            animation: paused ? "none" : "scroll-left 20s linear infinite",
          }}
        >
          {sampleData.map((show, index) => (
            <div
              key={index}
              className="relative w-1/5 flex-none h-fit  bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer"
              onMouseEnter={() => setSelectedCard(null)} // Hide dropdown when hovering over other cards
            >
              {/* Show GIF by default, switch to image on hover */}
              <Image
                src={selectedCard === index ? show.image : show.gif}
                alt={show.title}
                height={100}
                width={100}
                loading="eager"
                priority={true}
                unoptimized={true}
                className="w-full h-40 object-cover rounded-md"
                onMouseEnter={(e) => e.target.src = show.image}
                onMouseLeave={(e) => e.target.src = show.gif}
              />

              <div className="flex justify-between p-4 items-center mt-2">
                <h3 className="font-bold text-lg">{show.title}</h3>
                <div className="flex items-center gap-2">
                  <FaBell size={20} className="text-gray-500" />
                  <FaChevronDown
                    size={20}
                    className="text-gray-500 cursor-pointer"
                    onClick={() => setSelectedCard(selectedCard === index ? null : index)}
                  />
                </div>
              </div>

              {/* Dropdown content */}
              {selectedCard === index && (
                <div className="absolute left-0 top-full mt-2 p-4 bg-white border rounded-lg shadow-lg">
                  <p className="text-sm">{show.description}</p>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="text-sm text-blue-500 mt-2"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
  )
}

export default Slider
