import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import Link from "next/link";
const Devices = () => {
  return (
    <div className="bg-gradient-to-t from-[#E4E2F2] to-[#CCCAC4] h-[70vh] font-sniglet place-content-center items-center md:grid grid-cols-2">
      <div className="col-span-1">
        <Image
          src="/assets/png/mockup.png"
          width={5000}
          height={3000}
          alt="famfriendly"
          className="brightness-90 "
        />
      </div>
      
      <div  className="col-span-1 gap-4 flex items-start justify-center flex-col px-5 sm:px-10 md:px-16">
        <h1 className="text-3xl md:text-3xl lg:text-6xl text-center md:text-left mx-auto md:m-0 font-lucky text-[#9C29B2] text-stroke-eading">
          Across all devices
        </h1>
        <p className="text-lg text-[#282828]">
          Mobile Phones, Laptops, Tablets, TV screens, Loveworld Kiddies are everywhere to gladen your day with fun, educative and God-based content. Get Started, <span className="text-primary">Install LKN on your favorite device today!</span>
        </p>
        <div className="flex items-center ">
        <Link
          href="/channels"
          className=""
        >
          <Image
          src="/assets/png/playstore.png"
          width={5000}
          height={3000}
          alt="playstore"
          className="w-60"
        />
        </Link>
        <Link
          href="/channels"
          className=""
        >
          <Image
          src="/assets/png/lwapp.png"
          width={5000}
          height={3000}
          alt="playstore"
          className="w-64"
        />
        </Link>
        </div>
      </div>
      
    </div>
  );
};
export default Devices;
