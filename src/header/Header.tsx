import Logo from "../assets/logo.png";
import GenreDropDown from "./GenreDropDown";
import { MdAccountCircle } from "react-icons/md";
import { HiViewList } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue } from "./headerSearch";
import { BiCameraMovie } from "react-icons/bi";
import { NavLink } from "react-router";

function Header() {
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(event.target.value));
  };

  const { inputValue } = useSelector(
    (state: { headerSearch: { inputValue: string } }) => state.headerSearch
  );
  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-black z-10 py-5">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex items-center gap-3 sm:gap-6">
            <NavLink to={"/"}>
              <BiCameraMovie className="text-white h-8 w-8 sm:h-10 sm:w-10" />
            </NavLink>

            <input
              onChange={handleInputChange}
              placeholder="Search Movie"
              className="bg-black border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full max-w-[300px] sm:max-w-[400px] p-2.5"
              value={inputValue}
            />
            <GenreDropDown />
            <div className="flex items-center ml-auto gap-4">
              <NavLink to={"/user-login"}>
                <MdAccountCircle className="text-white h-8 w-8 sm:h-10 sm:w-10" />
              </NavLink>
              <NavLink to={"/watch-list"}>
                <HiViewList className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
