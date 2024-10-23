import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import Link from "next/link";
const Devices = () => {
  return (
    <div className="bg-gradient-to-t from-[#E4E2F2] to-[#CCCAC4] h-[70vh] font-sniglet place-content-center items-center grid grid-cols-2">
      <div data-aos="fade-right" className="col-span-1">
        <Image
          src="/assets/png/mockup.png"
          width={5000}
          height={3000}
          alt="famfriendly"
          className="brightness-90 "
        />
      </div>
      
      <div data-aos="fade-up" className="col-span-1 gap-4 flex items-start justify-center flex-col px-16">
        <h1 className="text-6xl font- font-lucky text-[#9C29B2] text-stroke-eading">
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
