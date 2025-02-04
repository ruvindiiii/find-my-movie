import { FaSearch } from "react-icons/fa";
import Logo from "./assets/logo.png";
import DropDown from "./GenreDropDown";
import { MdAccountCircle } from "react-icons/md";
import { RiPlayListAddFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue } from "./redux/headerSearch";

import { NavLink } from "react-router";

function Header() {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    dispatch(setInputValue(event.target.value));
  };

  const { inputValue } = useSelector((state) => state.headerSearch);
  return (
    <>
      <div className="flex flex-row justify-start items-center pb-[25px] pt-[25px] pl-[40px] gap-10">
        <img src={Logo} className="h-[40px] w-[40px]" />
        <input
          onChange={handleInputChange}
          placeholder="Search Movie"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px]  ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600  "
          value={inputValue}
        />
        <DropDown />
        <NavLink to={"/user-login"}>
          <MdAccountCircle className="text-white w-[45px] h-[45px]" />
        </NavLink>
        <NavLink to={"/watch-list"}>
          <RiPlayListAddFill className="w-[45px] h-[45px] text-white" />
        </NavLink>
      </div>
    </>
  );
}

export default Header;
