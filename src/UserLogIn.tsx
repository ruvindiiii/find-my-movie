import { NavLink, useNavigate } from "react-router";
import { IoHome } from "react-icons/io5";
import { useState } from "react";

function UserLogIn(params: type) {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginBtn = async () => {
    let url = "http://localhost:3000/users/login";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    });

    let result = await response.json();
    console.log(result);
    if (result.status === "Ok") {
      navigate("/watch-list");
      //navigate to the watch list page
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <div className="text-white flex flex-col justify-around items-center  ">
        <input
          onChange={handleUserName}
          placeholder="user name"
          className="text-black bg-white h-[50px] w-[350px] mb-[16px] rounded-md pl-[20px]"
        ></input>
        <input
          onChange={handlePassword}
          placeholder="password"
          className="text-black bg-white h-[50px] w-[350px] mb-[66px] rounded-md pl-[20px]"
        ></input>
        <p>{error}</p>
        <button
          onClick={handleLoginBtn}
          className=" text-black  mb-[16px] w-[350px] bg-white"
        >
          LogIn
        </button>

        <NavLink to="/">
          <button className=" text-black  mb-[16px] w-[350px] flex align-center justify-center bg-white">
            <IoHome className="h-[20px] w-[20px] text-black" />
          </button>
        </NavLink>
        <NavLink to="/sign-up">
          <p className=" text-white  mb-[16px]">Sign up here</p>
        </NavLink>
      </div>
    </>
  );
}

export default UserLogIn;
