'use client'
import React, {useState} from 'react'
import OTPVerification from '@/app/components/OTP'
import Image from "next/image"
import Verified from '@/app/components/Verified'

const OTP = () => {
  const[next, setNext] = useState("option")
  return (
    <div className="md:grid grid-cols-2">
      {next == 'otp' && (<OTPVerification setNext={setNext} />)}
      {next == 'option' && (<Verified setNext={setNext} />)}
      <div className="relative hidden md:block">
        <Image src="/assets/png/register.png" alt="background" layout="fill" className="object-cover"/>
      </div>
    </div>
  )
}

export default OTP
