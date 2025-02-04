import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { GiHeartMinus } from "react-icons/gi";
import { removeFromList } from "./redux/watchList";
import { useDispatch } from "react-redux";

function WatchList(params: type) {
  const dispatch = useDispatch();
  const watchListState = useSelector((state) => state.watchList);

  const handleRemoveBtn = (id) => {
    dispatch(removeFromList(id));
  };
  return (
    <>
      <div className="text-white">
        <h1>Watch List</h1>
        <div>
          {watchListState.list.map((watchListObj) => {
            return (
              <div>
                <img
                  className="rounded-md group/item h-[300px] mr-[20px]"
                  src={"https://image.tmdb.org/t/p/w500" + watchListObj.image}
                />

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
        <NavLink to="/">
          <button>Back</button>
        </NavLink>
      </div>
    </>
  );
}

export default WatchList;
