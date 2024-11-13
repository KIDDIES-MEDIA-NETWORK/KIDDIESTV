import React from "react";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";

const Verified = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen font-sniglet bg-[#FFCC063c] px-7 py-10 sm:px-10 md:px-12">
      <Image
        src="/assets/png/loveworld-kiddies-network.png"
        className="mx-auto"
        alt="lkn logo"
        width={100}
        height={100}
      />
      <div className="text-center mx-auto">
        <h3 className="text-2xl md:text-4xl font-bold text-primary">
          Success!{" "}
        </h3>
        <p>Your account has been successfully verified</p>
<div className="md:w-[85%] w-full mx-auto">

        <DotLottieReact
          src="/video/success.json"
          loop
          autoplay
          className=""
          color="black"
          />
          </div>

        <p className="md:w-[65%] mx-auto">You can log in to continue watching our livestream channels or complete your profile</p>
        <div className="flex flex-wrap mt-8 gap-5 items-center justify-center">
          
          <button onClick={() => router.push("/auth/login")} className="border border-primary px-5 py-2 text-primary rounded-full ">Skip to login</button>
          <button  className=" bg-[#9C29B2] animate-pulse hover:animate-none px-5 py-2 text-white rounded-full shadow-lg">finish up profile</button>

        </div>
      </div>
    </div>
  );
};

export default Verified;
