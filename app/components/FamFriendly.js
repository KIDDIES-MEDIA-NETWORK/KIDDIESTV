import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import Link from "next/link";

const FamFriendly = () => {
  return (
    <div className="bg-gradient-to-t from-[#D18E6B] to-[#D18E6B] h-[80vh] font-sniglet md:grid grid-cols-3 py-6">
      <div  className="col-span-1 gap-4 flex items-start justify-center flex-col px-5 md:px-16">
        <h1 className="text-3xl md:text-3xl text-center md:text-left lg:text-6xl font- font-lucky text-white text-stroke-heading">
          Family Centric
        </h1>
        <p className="text-lg">
          Enjoy our educative and fun collection of faith-based, family centered
          content. With Loveworld Kiddies Network, there’s something for
          everyone - Dad, Mom and kids of all ages.
        </p>
        <Link
          href="/channels"
          className="bg-gradient-to-b from-[#2E80FB] to-[#386299]  shadow-xl border-2  m-auto  rounded-full pr-6 md:pr-12 pl-5  text-lg md:text-2xl text-center flex items-center "
        >
          <p className="w-20 md:w-40  -ml-6 md:-ml-12 invert-[0] fill-slate-500 -mr-5 md:-mr-10 text-center">
            <DotLottieReact
              src="/assets/svgs/lottie.json"
              loop
              autoplay
              className=""
              color="black"
            />
          </p>{" "}
          <p className="text-[#fff] font-bold">Get started</p>
        </Link>
      </div>
      <div className="col-span-2 hidden md:block">
        <Image
          src="/assets/png/famfriendd.png"
          width={3000}
          height={2000}
          alt="famfriendly"
          className="h-[80vh] brightness-125"
        />
      </div>
    </div>
  );
};
export default FamFriendly;
