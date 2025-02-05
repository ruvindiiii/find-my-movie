import { NavLink } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPassWord, setUserName, setName } from "./redux/signup";

function SignUp(params: type) {
  const dispatch = useDispatch();
  const { password, userName, name } = useSelector((state) => state.signUp);

  const handleName = (event: any) => {
    dispatch(setName(event.target.value));
  };

  const handleUserName = (event: any) => {
    dispatch(setUserName(event.target.value));
  };

  const handlePassword = (event: any) => {
    dispatch(setPassWord(event.target.value));
  };

  const handleSignUpBtn = async () => {
    const payload = {
      name: name,
      username: userName,
      password: password,
    };

    const url = "http://localhost:3000/users/register";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });

    const result = await response.json();
  };

  return (
    <>
      <div className="text-white flex flex-col justify-around items-center ">
        <p className="mb-[16px]">Enter your details to sign up</p>

        <input
          onChange={handleName}
          placeholder="Name"
          className="text-black bg-white h-[50px] w-[350px] mb-[16px] rounded-md pl-[20px]"
        ></input>

        <input
          onChange={handleUserName}
          placeholder="Create a User Name"
          className="text-black bg-white h-[50px] w-[350px] mb-[16px] rounded-md pl-[20px]"
        ></input>

        <input
          onChange={handlePassword}
          placeholder="Create your Passsword"
          className="text-black bg-white h-[50px] w-[350px] mb-[66px] rounded-md pl-[20px]"
        ></input>

        <NavLink to="/watch-list">
          <button
            onClick={handleSignUpBtn}
            className=" text-black  mb-[16px] w-[350px] bg-white"
          >
            Sign up
          </button>
        </NavLink>
      </div>

      <NavLink
        to="/user-login"
        className="text-black h-[50px] w-[350px] mb-[16px] "
      >
        <button className=" text-black  mb-[16px] w-[350px] flex align-center justify-center bg-white">
          <IoMdArrowRoundBack className="h-[20px] w-[20px]" />
        </button>
      </NavLink>
    </>
  );
}

export default SignUp;
