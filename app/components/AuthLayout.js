"use client";
import Image from "next/image";
import React, { useState } from "react";
import TextInput from "../utils/TextInput";
import { CiMail, CiPhone } from "react-icons/ci";
import { GiPadlock } from "react-icons/gi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const AuthLayout = ({ heading, action }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");


  const showError = (type) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const validateEmail = () => {
    setError(null);

    let isError = false;

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email) {
      setError({ type: "email", message: "An Email is required" });
      isError = true;
    } else if (!reg.test(email)) {
      setError({ type: "email", message: "The Email is not valid" });
      isError = true;
    }

    return isError;
  };

  const register = async () => {
    let isError = validateEmail();
    if (isError) return;
  };

  const switchRoutes = () => {
    if (route.pathname == "/auth/login") {
      login();
    }
    if (route.pathname == "/auth") {
      register();
    }
    if (route.pathname == "/auth/change-password") {
      login();
    }
   
    if (route.pathname == "/auth/admin/login") {
      login();
    }
  };
 

  return (
    <div>
      <div>
        <Image
          src="/assets/png/loveworld-kiddies-network.png"
          className=""
          alt="lkn logo"
          width={50}
          height={50}
        />
        <div>
          <h3>{heading}</h3>
          <p>{action} to access all features and programs</p>
        </div>
        {action == "signup" && (
          <div>
            <div>
              <label htmlFor="email">Email</label>
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
              <input className="" placeholder="Enter a unique username" />
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
          </div>
        )}
      </div>
      <div>
        <Image src="/assets/png/signupbg.png" alt="background" layout="fill"/>
      </div>
    </div>
  );
};

export default AuthLayout;
