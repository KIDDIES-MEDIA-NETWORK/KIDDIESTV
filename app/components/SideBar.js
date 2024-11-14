"use client";
import { useState, useEffect } from "react";
import { IoClose, IoGift, IoHeart, IoTv } from "react-icons/io5";
import { RiAccountCircleFill, RiNotification2Line } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { MdArticle } from "react-icons/md";
import { HiMiniHome } from "react-icons/hi2";
import { FaMoneyCheck } from "react-icons/fa6";
import { usePathname } from "next/navigation";

const SidebarMenu = ({ setMenuOpen }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const pathname = usePathname();

  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, 500);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left to close
      handleCloseMenu();
    } else if (touchEndX - touchStartX > 50) {
      // Swipe right to open
      setMenuOpen(true);
    }
  };

  useEffect(() => {
    // Add touch event listeners
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      // Clean up touch event listeners
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStartX, touchEndX]);

  const isActive = (href) => pathname === href;

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-gradient-to-tr from-[#bc7d5b] to-[#ffb48d] bg-[ #DD9874] text-slate-800 h-screen z-[1000000] transition-all duration-500 ease-in-out lg:hidden ${
        isClosing ? "slide-out" : "slide-in"
      }`}
    >
      <div className="flex px-5 py-5 items-center justify-between">
        <div className="flex items-center w-full justify-between gap-5 md:hidden">
          <div className="flex gap-4 items-center font-bold text-2xl">
            <Image
              src="/assets/png/loveworld-kiddies-network.png"
              width={300}
              height={300}
              alt="Logo"
              className="w-16"
            />
          </div>

          <button onClick={handleCloseMenu}>
            <IoClose size={35} className="hover:text-button cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="text-lg flex flex-col">
        <Link
          href="/"
          className={`flex items-center justify-between border-b px-5 py-8 ${
            isActive("/") ? "bg-gray-400" : ""
          } hover:text-primary `}
        >
          <div className="flex items-center gap-3">
            <HiMiniHome size={30} />
            <span>Home</span>
          </div>
        </Link>
        <Link
          href="/channels"
          className={`flex items-center justify-between border-b px-5 py-8 ${
            isActive("/channels") ? "bg-gray-400" : ""
          } hover:text-[#282828] `}
        >
          <div className="flex items-center gap-3">
            <IoTv size={30} />
            <span>View Channels</span>
          </div>
        </Link>
        
        <Link
          href="/partner"
          className={`flex items-center justify-between border-b px-5 py-8 ${
            isActive("/partner") ? "bg-gray-400" : ""
          } hover:text-[#282828] `}
        >
          <div className="flex items-center gap-3">
            <FaMoneyCheck size={30} />
            <span>Partner with LKN</span>
          </div>
        </Link>
        <Link
          href="/blog"
          className={`flex items-center justify-between border-b px-5 py-8 ${
            isActive("/blog") ? "bg-gray-400" : ""
          } hover:text-[#282828] `}
        >
          <div className="flex items-center gap-3">
            <MdArticle size={30} />
            <span>Blog</span>
          </div>
        </Link>
        <Link
          href="/auth/login"
          className="text-[#282828] bg-button animate-pulse hover:animate-none flex items-center justify-between border-b px-5 py-8"
        >
          <div className="flex items-center gap-3">
            <RiAccountCircleFill size={30} />
            <span>Log in</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarMenu;
