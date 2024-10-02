import Link from "next/link";
import { BiArrowToTop, BiLogoFacebook } from "react-icons/bi";
import { CiMail, CiPhone } from "react-icons/ci";
import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-[#e4e2f2]">
      <section className="section">
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
        <div class="wave wave3"></div>
        <div class="wave wave4"></div>
      </section>

      <div className="bg-[#343435] roun ded-t-[3rem] px-7 pb-7 sm:px-10">
        <div className=" text-white flex flex-wrap items-start justify-between gap-6">
          <div className="flex flex-col">
            <h3 className="text-2xl pb-3">Quick Links</h3>
            <Link href="/orders">LiveTV</Link>
            <Link href="/user">Watch Videos</Link>
            <Link href="/auth/login">Subscriptions</Link>
            <Link href="/favorites">KingsChat</Link>
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl pb-3">Enquiry</h3>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/contact">Our Channels</Link>
            <Link href="/t&c">Terms and Conditions</Link>
            <Link href="/faqs">FAQS</Link>
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl pb-3">Support</h3>
            <Link href="/about" className="flex items-center gap-1">
              <CiMail /> Email Support
            </Link>
            <Link href="/contact" className="flex items-center gap-1">
              <CiPhone /> Phone Support
            </Link>
            <Link href="/dashboard" className="flex items-center gap-1">
              <FaWhatsapp /> Whatsapp Support
            </Link>
          </div>
          <div className="">
            <h3 className="text-xl pb-3">Connect with Us</h3>
            <div className="flex gap-3">
              <Link
                href="/about"
                className="p-3 bg-[#9C29B2] text-white rounded-[100%]"
              >
                <BiLogoFacebook />
              </Link>
              <Link
                href="/contact"
                className="p-3 bg-[#9C29B2] text-white rounded-[100%]"
              >
                <FaXTwitter />{" "}
              </Link>
              <Link
                href="/dashboard"
                className="p-3 bg-[#9C29B2] text-white rounded-[100%]"
              >
                <FaWhatsapp />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-7 text-white">
          <h3>GET DAILY/WEEKLY UPDATES</h3>
          <small>Receive emails on our newsletters</small>
          <form className="mt-4  flex items-center  sm:w-fit bg-white rounded-xl">
            <input
              type="email"
              name="email"
              className="bg-transparent text-black p-2 w-full focus:outline-none"
            />
            <button
              type="submit"
              className=" font-semibold bg-[#9C29B2] rounded-r-xl p-3"
            >
              subscribe
            </button>
          </form>
        </div>

        <hr className="my-6 border-slate-500" />

        <div className="text-xs text-center  text-slate-400 sm:float-right">
          Copyright &copy; {currentYear} Loveworld Kiddies Network All Rights
          Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
