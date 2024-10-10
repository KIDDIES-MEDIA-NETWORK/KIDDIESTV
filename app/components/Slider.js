import {useState} from 'react'
import { sampleData } from '../data/sampleData';
import Image from 'next/image';
import { FaBell, FaChevronDown } from "react-icons/fa";
import { FaChevronRight } from 'react-icons/fa6';

const Slider = () => {
    // const [loading, setLoading] = useState(true); // State to manage loading text
  const [paused, setPaused] = useState(false); // State to control slider pause on hover
  const [selectedCard, setSelectedCard] = useState(null); // State for the selected card dropdown
  return (
    <div  
        data-aos="fade-top"
        className={` w-[90vw]  rounded-2xl  mt-5  mx-auto overflow-hidden ${paused ? "" : "animate-scroll"}  `}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex items-stretch space-x-4"
          style={{
            animation: paused ? "none" : "scroll-left 20s linear infinite",
          }}
        >
          {sampleData.map((show, index) => (
            <div
              key={index}
              className="relative w-1/5 flex-none h-fit   rounded-2xl shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer"
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
                className="w-full h-52 object-cover rounded-2xl"
                onMouseEnter={(e) => e.target.src = show.image}
                onMouseLeave={(e) => e.target.src = show.gif}
              />

              <div className='bg-gradient-to-t from-[#282828] rounded-2xl to-transparent absolute top-0 left-0 w-full h-full'></div>

              <div className="absolute bottom-0 left-0 text-white flex  w-full justify-between p-4 items-center mt-2">
                <h3 className="font-sniglet text-lg">{show.title}</h3>
                <div className="bg-[#ffffff69] p-1.5 text-white rounded-full">
                  <FaChevronRight
                    size={20}
                    color={'#000'}
                    className="text-gray-500 cursor-pointer"
                    onClick={() => setSelectedCard(selectedCard === index ? null : index)}
                  />
                </div>
              </div>

              {/* Dropdown content */}
              {selectedCard === index && (
                <div className="absolute left-0 top-full mt-2 p-4 bg-white border rounded-2xl shadow-lg">
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
