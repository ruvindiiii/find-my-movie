import { NavLink, useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { setCountry, setToken } from "./user";
import {
  setPassWord,
  setUserName,
  setName,
  setCountries,
  setSelectedCountry,
  CountryInfo,
} from "./signUp";
import { useEffect } from "react";
import { backendUrl, getCountryList } from "../api";

function SignUp(params: type) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { password, userName, name, countries, selectedCoutry } = useSelector(
    (state) => state.signUp
  );

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
      selectedCountry: selectedCoutry,
    };
    const url = `${backendUrl}/users/register`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });

    let result = await response.json();
    if (result.status === "ok" && result.token) {
      dispatch(setToken(result.token));
      dispatch(setCountry(result.country));
    }
    navigate("../");
  };

  useEffect(() => {
    const getCountries = async () => {
      let result = await getCountryList();
      let countryArr = result.map((obj: any) => {
        return { displayName: obj.english_name, code: obj.iso_3166_1 };
      });
      dispatch(setCountries(countryArr));
    };
    getCountries();
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCountry(event.target.value));
  };

  return (
    <>
      <div className="text-white flex flex-col justify-around items-center ">
        <p className="mb-[30px] text-3xl">Sign up</p>
        <input
          onChange={handleName}
          placeholder="Name"
          className="text-black bg-white h-[50px] w-[350px] mb-[16px] rounded-md pl-[20px]"
        ></input>
        <input
          onChange={handleUserName}
          placeholder="Username"
          className="text-black bg-white h-[50px] w-[350px] mb-[16px] rounded-md pl-[20px]"
        ></input>
        <input
          onChange={handlePassword}
          placeholder="Passsword"
          className="text-black bg-white h-[50px] mb-[16px] w-[350px] rounded-md pl-[20px]"
        ></input>
        <select
          onChange={handleCountryChange}
          required
          className="text-black bg-white h-[50px] w-[350px] mb-[66px] rounded-md pl-[20px]"
        >
          {countries.map((country: CountryInfo) => {
            return (
              <option value={country.code}>
                {getUnicodeFlagIcon(country.code)} {country.displayName}
              </option>
            );
          })}
        </select>

        <button
          onClick={handleSignUpBtn}
          className=" text-black  mb-[16px] w-[350px] bg-white"
        >
          Sign up
        </button>
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
