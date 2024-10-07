import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuPhoneCall } from "react-icons/lu";
import { FaCirclePlay } from 'react-icons/fa6';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect to change the background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 w-full px-10  flex justify-between  
      transition-all duration-300 ease-in-out text-white
      ${isScrolled ? 'bg-primary  shadow-lg items-center h-0 py-10' : 'bg-transparent items-start h-52 py-2'}`
    } 
      style={{
        backgroundImage: isScrolled ? 'none' : `url(/assets/png/header.png)`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Image 
        src="/assets/png/loveworld-kiddies-network.png" 
        width={110} 
        height={80} 
        alt="loveworld kiddies network Logo"
      />
      
      <nav className={`flex justify-between items-center gap-4 ${isScrolled ? 'md:mt-0' :'md:mt-3'}`}>
        <Link href={"/"}>Home</Link>
        
        <Link href={"/contact"} className='flex items-center gap-1'>
          <LuPhoneCall />
          Contact
        </Link>

        <Link href={"/live"} className='flex items-center font-semibold gap-1 bg-gradient-to-t from-[#bc7d5b] to-[#ffb48d]  px-3 py-1.5 rounded-full text-white animate-pulse'>
          <FaCirclePlay />
          Live TV
        </Link>

        <button href={"/live"} className='w-9 h-9'>
          <Image src="/assets/png/profiledefault.png" height={50} width={50} className="w-full h-full object-cover" alt="user icon"/>
        </button>
      </nav>
    </div>
  );
}

export default Header;
