import { useEffect } from "react";
import { setList } from "../pages/watchList/watchList";
import { useDispatch, useSelector } from "react-redux";
import { getWatchList } from "../api";

function StateSyncer() {
  let { token } = useSelector((state) => state.login);
  let dispatch = useDispatch();
  useEffect(() => {
    const getMovieWatchList = async () => {
      let watchList = await getWatchList(token);
      dispatch(setList(watchList));
    };
    getMovieWatchList();
  }, []);

  return <></>;
}

export default StateSyncer;
