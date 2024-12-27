'use client'
import React, { useState, useEffect, useRef } from 'react';
import '@/app/globals.css'
import { useAuth } from '../context/AuthContext';
import axios from "axios";


const OTPVerification = ({setNext}) => {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 2 minutes in seconds
  const [otpInputs, setOtpInputs] = useState(Array(6).fill(''));
  const timerRef = useRef(null);
  const inputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));
  // const email = "user@example.com"; // Simulated email for demonstration
  const { email } = useAuth();


  useEffect(() => {
    inputRefs.current[0].current.focus(); // Focus on the first input when the component mounts
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleInputChange = (value, index) => {
    if (value.length > 1) value = value.slice(0, 1);
    const updatedOtp = [...otpInputs];
    updatedOtp[index] = value;
    setOtpInputs(updatedOtp);

    if (value && index < otpInputs.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpInputs[index] && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
    if (e.key === 'e') e.preventDefault(); // Prevent entering 'e' in number input
  };

  const verifyOTP = async () => {
    const otp = otpInputs.join('');
    const otpNumber = Number(otp); // or use parseInt(otp, 10)
    const body={
      email,
      verificationCode: otpNumber,
    }
    
    if (otp.length === 6) {
      if (timeLeft > 0) {
        try {
          setLoading(true);
          const res = await axios.post(
            `https://lkn.up.railway.app/api/auth/verify/otp`,
            body
          );
    
          setLoading(false);
          if (!res?.data?.success) return
          setNext('option')

        } catch (error) {
          setLoading(false);
          console.log(error);
          
        }
      } else {
        alert('OTP has expired. Please request a new one.');
      }
    } else {
      alert('Please enter a 6-digit OTP');
    }
  };

  const resendOTP = () => {
    if (timeLeft > 0) {
      alert('New OTP sent!');
      setOtpInputs(Array(6).fill(''));
      setTimeLeft(120);
      inputRefs.current[0].current.focus(); // Focus on the first input
      clearInterval(timerRef.current);
      startTimer();
    } else {
      alert('Cannot resend code. Time has expired.');
    }
  };

  return (
    <div>
    <div className=" font-sniglet flex items-center justify-center min-h-screen text-white p-4">
      <div className="bg-gray-800 p-3 py-8 sm:p-8 flex md:block flex-col justify-center items-center rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl  mb-4">OTP Verification</h1>
        {email && (<p className="mb-6">
          Enter the OTP you received to <span className="text-[#D4916D]">{email}</span>
        </p>)}
        <div className="sm:flex space-x-1 md:space-x-2 mb-6 custom-scrollbar">
          {otpInputs.map((_, index) => (
            <input
            key={index}
            ref={inputRefs.current[index]}
            type="number"
            className="w-9 sm:w-12 h-9 sm:h-14 bg-gray-700 text-center text-2xl rounded-lg border border-purple-500 focus:outline-none focus:ring-2 focus:ring-[#D4916D] overflow-hidden scrollbar-none"
            value={otpInputs[index]}
            onChange={(e) => handleInputChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
          ))}
        </div>
        <button
          onClick={verifyOTP}
          className="bg-gradient-to-l from-[#C68562] border border-white active:bg-gradient-to-r to-[#D4916D] px-6 py-2 rounded-lg text-white mx-auto sm:mx-0 font-medium hover:brightness-90 transition-transform duration-200"
        >
          Verify
        </button>
        <div className="mt-4 text-gray-400">
          Didn't receive the code?{' '}
          <span
            className="text-[#D4916D] cursor-pointer hover:underline"
            onClick={resendOTP}
          >
            Resend Code
          </span>
          <span className="ml-2">{timeLeft > 0 ? `(${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')})` : <span className="text-red-400">Code expired</span>}</span>
        </div>
      </div>
    </div>
    
    </div>
  );
};

export default OTPVerification;
