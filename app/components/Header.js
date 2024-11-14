"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuPhoneCall } from "react-icons/lu";
import { FaCirclePlay } from "react-icons/fa6";
import { FaUserPlus, FaUserCircle } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import SidebarMenu from "./SideBar";
import { useAuth } from "@/app/context/AuthContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathName = usePathname();

  const { email, userInfo } = useAuth();

  // Scroll effect to change the background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`font-sniglet px-5 sm:px-10 md:px-16 lg:px-16   flex justify-between  
      transition-all duration-100 ease-in-out text-white
      ${
        isScrolled || pathName !== "/"
          ? "bg-primary  shadow-lg items-center h-0 py-8 sm:py-10"
          : "bg-transparent items-start md:h-52 sm:h-[7rem] h-[6rem] py-2"
      }`}
      style={{
        backgroundImage:
          isScrolled || pathName !== "/"
            ? "none"
            : `url(/assets/png/header.png)`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      {menuOpen && <SidebarMenu setMenuOpen={setMenuOpen} />}
      <Image
        src="/assets/png/loveworld-kiddies-network.png"
        width={110}
        height={80}
        alt="loveworld kiddies network Logo"
        className="w-16 md:w-24"
      />

      <nav
        className={`hidden md:flex  justify-between items-center text-lg gap-8 ${
          isScrolled || pathName !== "/" ? "md:mt-0" : "md:mt-3"
        }`}
      >
        <Link href={"/"}>Home</Link>

        <Link href={"/contact"} className="flex items-center gap-1">
          <LuPhoneCall />
          Contact Us
        </Link>

        <Link
          href={"/channels"}
          className="flex items-center font-semibold gap-1 bg-gradient-to-t from-[#bc7d5b] to-[#ffb48d]  px-3 py-1.5 rounded-full text-white animate-pulse"
        >
          <FaCirclePlay />
          Live TV
        </Link>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button href={"/live"} className=" flex items-center gap-3">
            <Image
              src="/assets/png/profiledefault.png"
              height={30}
              width={30}
              className=" object-cover"
              alt="user icon"
            />{" "}
            {userInfo ? userInfo?.username : "Account"}
          </button>
          {isHovered && (
            <div className="flex absolute top-10  right-0 rounded-xl flex-col  bg-white shadow-md w-[20rem] py-5 text-black ">
              {userInfo ? (
                <div>
                  <Link
                    href="/auth/login"
                    className="hover:bg-primary border-y hover:border-none   flex items-center gap-2  py-3 px-4 hover:text-white"
                  >
                    <FaUserCircle /> Log out
                  </Link>
                  
                  <Link
                    href="/partner"
                    className="hover:bg-primary py-3 px-3.5 hover:text-white flex items-center gap-2"
                  >
                    <Image
                      src="/assets/png/espeesCoin.png"
                      height={10}
                      width={10}
                      className="w-[22px] h-full object-cover "
                      alt="user icon"
                    />
                    Partner with Us
                  </Link>
                </div>
              ) : (
                <div>
                  <Link
                    href="/auth/login"
                    className="hover:bg-primary border-y hover:border-none   flex items-center gap-2  py-3 px-4 hover:text-white"
                  >
                    <FaUserCircle /> Log in to account
                  </Link>
                  <Link
                    href="/auth"
                    className="hover:bg-primary py-3 px-4 flex items-center gap-2 hover:text-white"
                  >
                    <FaUserPlus /> Create an account
                  </Link>
                  <Link
                    href="/partner"
                    className="hover:bg-primary py-3 px-3.5 hover:text-white flex items-center gap-2"
                  >
                    <Image
                      src="/assets/png/espeesCoin.png"
                      height={10}
                      width={10}
                      className="w-[22px] h-full object-cover "
                      alt="user icon"
                    />
                    Partner with Us
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="block md:hidden" onClick={() => setMenuOpen(true)}>
        <IoIosMenu size={27} />
      </div>
    </div>
  );
};

export default Header;
