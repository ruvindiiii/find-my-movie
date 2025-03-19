import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { GiHeartMinus } from "react-icons/gi";
import { removeFromList } from "./watchList";
import { useDispatch } from "react-redux";

import ProviderLogos from "../movieInfo/ProviderLogos";
import type { MovieWithProviders } from "../../types";
import { useEffect } from "react";

function WatchList(params: type) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const watchListState = useSelector((state) => state.watchList);
  const { token } = useSelector((state) => state.user);
  const handleRemoveBtn = (id) => {
    dispatch(removeFromList({ movieId: id, token }));
  };

  useEffect(() => {
    if (!token) {
      navigate("/user-login");
    }
  }, [token]);

  return (
    <>
      <div className=" flex flex-col align-start">
        <h1 className="text-white text-3xl mb-[40px]">Watchlist</h1>

        <div className="mt-[100px] flex flex-col items-start">
          <div className="text-white text-1xl mb-[40px]">
            {!watchListState.list.length
              ? "Your watchlist is empty. You can add movies to your watchlist by clicking the add to watchlist icon on the movie page."
              : ""}
          </div>
          {watchListState.list.map((watchListObj: MovieWithProviders) => {
            return (
              <div className={"mb-[20px]"}>
                <div className="flex flex-row items-center justify-center ">
                  <img
                    className="rounded-md group/item h-[300px] mr-[20px]"
                    src={"https://image.tmdb.org/t/p/w500" + watchListObj.image}
                  />
                  <div className="flex flex-column ">
                    <p className="text-white w-[600px] mb-10">
                      {watchListObj.overview}
                    </p>
                    <ProviderLogos purchaseProviders={watchListObj.providers} />
                  </div>
                </div>

                <GiHeartMinus
                  className={"text-white h-[30px] w-[30px] mt-3"}
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
