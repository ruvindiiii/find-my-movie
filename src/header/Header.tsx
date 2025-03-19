import Logo from "../assets/logo.png";
import GenreDropDown from "./GenreDropDown";
import { MdAccountCircle } from "react-icons/md";
import { HiViewList } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue } from "./headerSearch";
import { BiCameraMovie } from "react-icons/bi";
import { NavLink } from "react-router";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface RootState {
  headerSearch: {
    inputValue: string;
  };
}

function Header() {
  const dispatch = useDispatch();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(event.target.value));
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const { inputValue } = useSelector((state: RootState) => state.headerSearch);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-black">
        <div className="max-w-[1200px] w-full mx-auto px-[30px]">
          <div className="flex flex-row pb-[25px] pt-[25px] gap-4 md:gap-10 items-center">
            <NavLink to={"/"}>
              <BiCameraMovie className="text-white h-[40px] w-[40px]" />
            </NavLink>

            {/* Mobile Search Icon */}
            <div className="md:hidden">
              <button onClick={toggleSearch} className="text-white">
                <IoSearchOutline className="h-[24px] w-[24px]" />
              </button>
            </div>

            {/* Search Bar - Hidden on mobile unless toggled */}
            <div
              className={`${
                isSearchVisible
                  ? "flex absolute left-0 right-0 top-full bg-black p-4"
                  : "hidden"
              } md:flex md:relative md:bg-transparent md:p-0 md:flex-1`}
            >
              <input
                onChange={handleInputChange}
                placeholder="Search Movie"
                className="bg-black border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[500px] ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600"
                value={inputValue}
              />
            </div>

            {/* Genres - Hidden on mobile */}
            <div className="hidden md:block">
              <GenreDropDown />
            </div>

            <div className="flex flex-row ml-auto gap-4">
              <NavLink to={"/user-login"}>
                <MdAccountCircle className="text-white h-[32px] w-[32px] md:h-[40px] md:w-[40px]" />
              </NavLink>
              <NavLink to={"/watch-list"}>
                <HiViewList className="h-[32px] w-[32px] md:h-[40px] md:w-[40px] text-white" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
