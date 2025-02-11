import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { GiHeartMinus } from "react-icons/gi";
import { removeFromList } from "./watchList";
import { useDispatch } from "react-redux";
import { IoHome } from "react-icons/io5";

function WatchList(params: type) {
  const dispatch = useDispatch();
  const watchListState = useSelector((state) => state.watchList);

  const handleRemoveBtn = (id) => {
    dispatch(removeFromList(id));
  };
  return (
    <>
      <div className=" flex flex-col align-start">
        <div
          className={
            "text-white flex flex-row justify-end items-center pb-[25px] pt-[25px] pr-[40px] gap-3 fixed top-0 left-0 w-full bg-black"
          }
        >
          <p>WatchList</p>
          <NavLink to="/">
            <IoHome className="h-[30px] w-[30px] text-white" />
          </NavLink>
        </div>
        <div className="mt-[100px] flex flex-col items-start">
          {watchListState.list.map((watchListObj) => {
            return (
              <div className={"mb-[20px]"}>
                <div className="flex flex-row items-center justify-center ">
                  <img
                    className="rounded-md group/item h-[300px] mr-[20px]"
                    src={"https://image.tmdb.org/t/p/w500" + watchListObj.image}
                  />
                  <p>{watchListObj.overview}</p>
                </div>

                <GiHeartMinus
                  className={"text-white h-[30px] w-[30px]"}
                  onClick={() => {
                    handleRemoveBtn(watchListObj.id);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default WatchList;
