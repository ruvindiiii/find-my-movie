import { NavLink, useNavigate } from "react-router";
import { IoHome } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { setUserName, setPassword, setError } from "./logIn";
import { setCountry, setToken } from "./user";
import { backendUrl } from "../api";
import { useEffect } from "react";

function UserLogIn(params: type) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userName, password, error } = useSelector((state) => state.login);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      navigate("/watch-list");
    }
  }, [token]);

  const handleUserName = (event: any) => {
    dispatch(setUserName(event.target.value));
  };

  const handlePassword = (event: any) => {
    dispatch(setPassword(event.target.value));
  };

  const handleLoginBtn = async () => {
    let url = `${backendUrl}/users/login`;
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
    if (result.status === "Ok" && result.token) {
      dispatch(setToken(result.token));
      dispatch(setCountry(result.country));
      navigate("/watch-list");

      //navigate to the watch list page
    } else {
      dispatch(setError("Invalid username or password"));
    }
  };

  return (
    <>
      <div className="text-white flex flex-col justify-around items-center  ">
        <h1 className="text-white text-3xl mb-[40px]">Login</h1>
        <input
          id="username"
          onChange={handleUserName}
          placeholder="Username"
          className="text-black bg-white h-[50px] w-[350px] mb-[16px] rounded-md pl-[20px]"
        ></input>
        <input
          id="password"
          onChange={handlePassword}
          placeholder="Password"
          className="text-black bg-white h-[50px] w-[350px] mb-[66px] rounded-md pl-[20px]"
        ></input>
        <p>{error}</p>
        <button
          id="login-button"
          onClick={handleLoginBtn}
          className=" text-black  mb-[16px] w-[350px] bg-white"
        >
          LogIn
        </button>
        <br />
        Do you already have an account?
        <NavLink to="/sign-up">
          <p className=" text-blue mb-[16px]">Sign up</p>
        </NavLink>
      </div>
    </>
  );
}

export default UserLogIn;
