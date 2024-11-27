import React from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaSquarePhone } from "react-icons/fa6";

const page = () => {
  return (
    <div className="font-sniglet bg-gradient-to-tr to-[#8DFFB4] from-[#8DFFB4] ">
      <Header />
      <div className="p-5 md:p-10 ">
        <h1 className="font-lucky text-5xl mx-auto text-center">Contact Us</h1>
        <p className="text-center text-xl">Got any Questions or Feedbacks?</p>
      </div>
      <div
        style={{
          backgroundImage: `url(/assets/png/Cc1.png)`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
        className="sm:grid py-8 md:pt-28  grid-cols-5 gap-5 sm:px-24  px-5 items-center"
      >
        <div className="col-span-3">
            <h3 className="text-3xl font-lucky text-primary">Get in touch!</h3>
            <div className="">
          <div className="">
            <div className="">
              <i className=""></i>
            </div>
            
            <div className="">
              <h4>Address</h4>
              <p>4671 Sugar Camp Road,<br/> Owatonna, Minnesota, <br/>55060</p>
            </div>
          </div>
          
          <div className="">
            <FaSquarePhone />
            
            <div className="">
              <h4>Phone</h4>
              <p>571-457-2321</p>
            </div>
          </div>
          <div className="">
          <a
                href="/about"
                className=""
              >
                <Image src="/assets/png/kingschat.webp" alt="Kingschat logo icon" width={40} height={40}/>
              </a>
            
            <div className="">
              <h4>KingsChat</h4>
              <p>@LKN</p>
            </div>
          </div>
          
          <div className="">
            <div className="">
            </div>
            
            <div className="">
              <h4>Email</h4>
             <p>info@loveworldkiddiesnetwork.tv</p>
            </div>
          </div>
        </div>
        </div>


        <div className="col-span-2 flex flex-col gap-4 bg-[#fff] rounded-2xl shadow-lg p-10">
          <h3 className="text-3xl text-primary font-lucky">We are just one chat away!</h3>
          <div className="flex flex-col ">
            <label>Full name</label>
            <input placeholder="eg: John Doe" className="border-b border-black focus:border-primary py-2 bg-transparent outline-0 placeholder:text-slate-600" />
          </div>
          <div className="flex flex-col ">
            <label>Email address</label>
            <input placeholder="eg: johndoe@gmail.com" className="border-b border-black focus:border-primary py-2 bg-transparent outline-0 placeholder:text-slate-600" />
          </div>
          <div className="flex flex-col ">
            <label>Message</label>
            <textarea rows="10" cols={30} placeholder="write a short and descriptive message to us..." className=" w-full border-0 resize-none  focus:border-primary focus:border p-3 bg-[#f4f4f4] rounded-2xl outline-0 placeholder:text-slate-600" />
          </div>

          <div>
            <button className="w-fit px-5 py-2 bg-primary mx-auto rounded-full  hover:shadow-md text-white">Send message</button>
          </div>
            

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
