import Image from 'next/image'
import Link from 'next/link'
import { LuPhoneCall } from "react-icons/lu";

const Header = () => {
  return (
    <div className='flex justify-between bg-[#3e3e3e83] text-white px-5'>
      <Image src="/assets/png/loveworld-kiddies-network.png" width={100} height={80} />
      
      <nav className='flex justify-between items-center gap-5'>
        <Link href={"/"}>Home</Link>
        <Link href={"/live"} className='flex items-center gap-1'>
        <Image src="/assets/png/play.png" height={30} width={30} />LIVE TV</Link>
        <Link href={"/contact"}  className='flex items-center gap-1'><LuPhoneCall />Contact</Link>

      </nav>
    </div>
  )
}

export default Header
