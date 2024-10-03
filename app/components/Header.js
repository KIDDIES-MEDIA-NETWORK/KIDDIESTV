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
        width={100} 
        height={80} 
        alt="Logo"
      />
      
      <nav className={`flex justify-between items-center gap-7 ${isScrolled ? 'md:mt-0' :'md:mt-3'}`}>
        <Link href={"/"}>Home</Link>
        <Link href={"/live"} className='flex items-center gap-1'>
          <FaCirclePlay />
          LIVE TV
        </Link>
        <Link href={"/contact"} className='flex items-center gap-1'>
          <LuPhoneCall />
          Contact
        </Link>
      </nav>
    </div>
  );
}

export default Header;
