"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname } from 'next/navigation';
import { LuPhoneCall } from "react-icons/lu";
import { FaCirclePlay } from 'react-icons/fa6';
import { FaUserPlus, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathName = usePathname ()
  console.log(pathName, "pathnnaammmeee")

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
      transition-all duration-100 ease-in-out text-white
      ${isScrolled  || pathName !== "/home" ? 'bg-primary  shadow-lg items-center h-0 py-10' : 'bg-transparent items-start h-52 py-2'}`
    } 
      style={{
        backgroundImage: isScrolled  || pathName !== "/home" ? 'none' : `url(/assets/png/header.png)`,
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
      
      <nav className={`flex  justify-between items-center gap-4 ${isScrolled || pathName !== "/home" ? 'md:mt-0' :'md:mt-3'}`}>
        <Link href={"/"}>Home</Link>
        
        <Link href={"/contact"} className='flex items-center gap-1'>
          <LuPhoneCall />
          Contact
        </Link>

        <Link href={"/live"} className='flex items-center font-semibold gap-1 bg-gradient-to-t from-[#bc7d5b] to-[#ffb48d]  px-3 py-1.5 rounded-full text-white animate-pulse'>
          <FaCirclePlay />
          Live TV
        </Link>

        <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <button href={"/live"} className='w-9 h-9'>
          <Image src="/assets/png/profiledefault.png" height={50} width={50} className="w-full h-full object-cover" alt="user icon"/>
        </button>
        { isHovered && (
          <div className='flex absolute top-10 right-0 rounded-xl flex-col  bg-white shadow-md w-48 py-5 text-black '>
            <Link href="/login" className="hover:bg-primary border-y hover:border-none   flex items-center gap-2  py-3 px-4 hover:text-white" ><FaUserCircle /> Log in to account</Link>
            <Link href="/register" className="hover:bg-primary py-3 px-4 flex items-center gap-2 hover:text-white" ><FaUserPlus /> Create an account</Link>
            <Link href="/register" className="hover:bg-primary py-3 px-3.5 hover:text-white flex items-center gap-2" ><Image src="/assets/png/espeesCoin.png" height={10} width={10} className="w-[22px] h-full object-cover " alt="user icon"/>Partner with Us</Link>
          </div>
        )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
