import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import Link from "next/link";
const FamFriendly = () => {
  return (
    <div className="bg-gradient-to-t from-[#905D70] to-[#995D6D] h-[80vh] font-sniglet grid grid-cols-3">
      <div data-aos="fade-right" className="col-span-1 gap-4 flex items-start justify-center flex-col px-16">
        <h1 className="text-6xl font- font-lucky text-white text-stroke-heading">
          Family Centric
        </h1>
        <p className="text-lg">
          Enjoy our educative and fun collection of faith-based, family centered
          content. With Loveworld Kiddies Network, there’s something for
          everyone - Dad, Mom and kids of all ages.
        </p>
        <Link
          href="/channels"
          className="bg-gradient-to-t from-[#bc7d5b] to-[#ffb48d]  shadow-xl border-2    rounded-full pr-12 pl-5   text-2xl text-center flex items-center "
        >
          <p className="w-40 -ml-12 fill-slate-500 -mr-10 text-center">
            <DotLottieReact
              src="/assets/svgs/lottie.json"
              loop
              autoplay
              className=""
              color="black"
            />
          </p>{" "}
          <p className="text-[#282828] font-bold">Get started</p>
        </Link>
      </div>
      <div data-aos="fade-up" className="col-span-2">
        <Image
          src="/assets/png/famfriendly.png"
          width={5000}
          height={3000}
          alt="famfriendly"
          className="h-full"
        />
      </div>
    </div>
  );
};
export default FamFriendly;
