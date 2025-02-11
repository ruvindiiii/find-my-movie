import Logo from "../assets/logo.png";
import GenreDropDown from "./GenreDropDown";
import { MdAccountCircle } from "react-icons/md";
import { RiPlayListAddFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue } from "./headerSearch";
import { BiCameraMovie } from "react-icons/bi";

import { NavLink } from "react-router";

function Header() {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    dispatch(setInputValue(event.target.value));
  };

  const { inputValue } = useSelector((state) => state.headerSearch);
  return (
    <>
      <div className="flex flex-row justify-start items-center pb-[25px] pt-[25px] pl-[40px] gap-10 fixed top-0 left-0 w-full bg-black ">
        <BiCameraMovie className="text-white h-[40px] w-[40px]" />

        <input
          onChange={handleInputChange}
          placeholder="Search Movie"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px]  ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600  "
          value={inputValue}
        />
        <GenreDropDown />
        <NavLink to={"/user-login"}>
          <MdAccountCircle className="text-white h-[30px] w-[30px]" />
        </NavLink>
        <NavLink to={"/watch-list"}>
          <RiPlayListAddFill className="h-[30px] w-[30px] text-white" />
        </NavLink>
      </div>
    </>
  );
}

export default Header;
