import Logo from "../assets/logo.png";
import GenreDropDown from "./GenreDropDown";
import { MdAccountCircle } from "react-icons/md";
import { HiViewList } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue } from "./headerSearch";
import { BiCameraMovie } from "react-icons/bi";
import { NavLink } from "react-router";

interface RootState {
  headerSearch: {
    inputValue: string;
  };
}

function Header() {
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(event.target.value));
  };

  const { inputValue } = useSelector((state: RootState) => state.headerSearch);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-black">
        <div className="max-w-[1200px] w-full mx-auto">
          <div className="flex flex-row pb-[25px] pt-[25px] gap-10 items-center">
            <NavLink to={"/"}>
              <BiCameraMovie className="text-white h-[40px] w-[40px]" />
            </NavLink>

            <input
              onChange={handleInputChange}
              placeholder="Search Movie"
              className="bg-black border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[500px] ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600"
              value={inputValue}
            />
            <GenreDropDown />
            <div className="flex flex-row ml-auto">
              <NavLink to={"/user-login"}>
                <MdAccountCircle className="text-white h-[40px] w-[40px] mr-[20px]" />
              </NavLink>
              <NavLink to={"/watch-list"}>
                <HiViewList className="h-[40px] w-[40px] text-white" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
