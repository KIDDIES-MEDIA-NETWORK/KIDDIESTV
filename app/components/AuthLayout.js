"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import TextInput from "../utils/TextInput";
import LoadingAnimation from "../utils/Loader";
import { CiMail, CiUser } from "react-icons/ci";
import { GiPadlock } from "react-icons/gi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/AuthContext';


const AuthLayout = ({ heading, action }) => {
  const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState("");
  const { email, setEmail } = useAuth();
  const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const BACKEND_URL = process.env.BACKEND_URL;
  const router = useRouter();

  const showError = (type) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const validateRegister = () => {
    setError(null);

    let isError = false;

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    if (!email) {
      setError({ type: "email", message: "An Email is required" });
      isError = true;
    } else if (!reg.test(email)) {
      setError({ type: "email", message: "The Email is not valid" });
      isError = true;
    } else if (!password) {
      setError({ type: "password", message: "Password is required" });
      isError = true;
    } else if (password.length < 6 ) {
      setError({ type: "password", message: "Password must have atleast 6 characters" });
      isError = true;
    } else if (!regex.test(password)) {
      setError({ type: "password", message: "Password must have aleast one capital, number and symbol" });
      isError = true;
    }  else if (password !== confirmPassword) {
      setError({ type: "confirmpassword", message: "Password and confirm password does not match" });
      isError = true;
    }


    return isError;
  };
  const validateLogin = () => {
    console.log({
      identifier,
      password,
    });
    setError(null);

    let isError = false;

    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    if (!identifier) {
      setError({ type: "username", message: "Email or username is empty" });
      isError = true;
    } else if (!password) {
      setError({ type: "password", message: "Password  must be filled" });
      isError = true;
    } else if (password.length < 6 || !regex.test(password)) {
      setError({ type: "password", message: "Password is invalid" });
      isError = true;
    }

    return isError;
  };

  // const register = async () => {
  //   let isError = validateEmail();
  //   if (isError) return;
  // };
  const register = async () => {
    let isError = validateRegister();
    if (isError) return;

    const body = {
      email,
      username,
      password,
    };
    try {
      setLoading(true);
      const res = await axios.post(
        `https://lkn-kfic.onrender.com/api/auth/register`,
        body
      );
      console.log(res);

      setLoading(false);
      if (!res?.data?.success) {
        setError({ type: "username", message: res?.data?.message });
        setError({ type: "email", message: res?.data?.message });
      }
      router.push("/auth/otp");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError({ type: "username", message: error?.response?.data?.message });
      setError({ type: "email", message: error?.response?.data?.message });
    }
  };
  const login = async () => {
    let isError = validateLogin();
    if (isError) return;

    const body = {
      identifier,
      password,
    };
    try {
      setLoading(true);
      const res = await axios.post(
        `https://lkn-kfic.onrender.com/api/auth/login`,
        body
      );
      console.log(res);

      setLoading(false);
      if (!res?.data?.success) {
        setError({ type: "username", message: res?.data?.message });
      }
      localStorage.setItem("gpt64", res?.data?.token);
      router.push("/channels");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError({ type: "username", message: error?.response?.data?.message });
    }
  };

  return (
    <div className="md:grid grid-cols-2 gap-5 h-screen font-sniglet">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#ffff ff3c] backdrop-blur-md z-50">
          <LoadingAnimation
            loadingMessage={"Creating account..."}
            loaderColor={"#386299"}
          />
        </div>
      )}

      <div className="flex flex-col gap-5 justify-center px-5 sm:px-10 py-5 md:px-12 lg:px-16">
        <Image
          src="/assets/png/loveworld-kiddies-network.png"
          className="mx-auto"
          alt="lkn logo"
          width={100}
          height={100}
        />
        <div className="text-center mx-auto">
          <h3 className="text-2xl md:text-4xl font-bold text-primary">
            {heading}
          </h3>
          <p>{action} to access all features and programs</p>
        </div>
        {action == "Sign up" && (
          <div className="flex-col flex gap-4">
            <div>
              <label htmlFor="email">Email Address</label>
              <TextInput
                name="email"
                placeholder="Enter your email address"
                icon={<CiMail size={23} color="#b1b1b1" />}
                inputType={"email"}
                string={email}
                onUpdate={setEmail}
                error={showError("email")}
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <TextInput
                name="username"
                placeholder="Enter unique username"
                icon={<CiUser size={23} color="#b1b1b1" />}
                inputType={"text"}
                string={username}
                onUpdate={setUsername}
                error={showError("username")}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <TextInput
                name="password"
                placeholder="Enter your password"
                icon={<GiPadlock size={23} color="#b1b1b1" />}
                inputType={"password"}
                string={password}
                onUpdate={setPassword}
                error={showError("password")}
                eyeIcon={
                  showPassword ? (
                    <IoEyeOffOutline size={23} color="gray" />
                  ) : (
                    <IoEyeOutline size={23} color="gray" />
                  )
                }
                onTogglePassword={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
              />
            </div>
            <div>
              <label htmlFor="confirm password">Confirm password</label>
              <TextInput
                name="confirmpassword"
                placeholder="confirm password"
                icon={<GiPadlock size={23} color="#b1b1b1" />}
                inputType={"password"}
                string={confirmPassword}
                onUpdate={setConfirmPassword}
                error={showError("confirmpassword")}
                eyeIcon={
                  showPassword ? (
                    <IoEyeOffOutline size={23} color="gray" />
                  ) : (
                    <IoEyeOutline size={23} color="gray" />
                  )
                }
                onTogglePassword={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
              />
            </div>
            <button
              disabled={!username || !email}
              className="text-xl text-white py-3 bg-gradient-to-t from-[#C68562] to-[#D4916D] cursor-pointer disabled:opacity-50  disabled:cursor-not-allowed shadow-md rounded-full"
              onClick={() => register()}
            >
              Create an Account{" "}
            </button>
            <div className="mx-auto text-sm">
              Have an account already?{" "}
              <Link className="text-primary font-bold" href="/auth/login">
                Log in
              </Link>
            </div>
          </div>
        )}
        {action == "Log in to your account" && (
          <div className="flex-col flex gap-5 md:gap-8">
            <div>
              <label htmlFor="username">Username or Email</label>
              <TextInput
                name="username"
                placeholder="Enter username or email address"
                icon={<CiUser size={23} color="#b1b1b1" />}
                inputType={"text"}
                string={identifier}
                onUpdate={setIdentifier}
                error={showError("username")}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <TextInput
                name="password"
                placeholder="Enter your password"
                icon={<GiPadlock size={23} color="#b1b1b1" />}
                inputType={"password"}
                string={password}
                onUpdate={setPassword}
                error={showError("password")}
                eyeIcon={
                  showPassword ? (
                    <IoEyeOffOutline size={23} color="gray" />
                  ) : (
                    <IoEyeOutline size={23} color="gray" />
                  )
                }
                onTogglePassword={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
              />
            </div>

            <button
              className="text-xl text-white py-3 bg-gradient-to-t from-[#C68562] to-[#D4916D] cursor-pointer disabled:opacity-50  disabled:cursor-not-allowed shadow-md rounded-full"
              onClick={login}
            >
              Log in
            </button>

            <div className="mx-auto text-sm">
              New here?{" "}
              <Link className="text-primary font-bold" href="/auth">
                Create an account
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="relative hidden md:block">
        <Image
          src="/assets/png/register.png"
          alt="background"
          layout="fill"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
