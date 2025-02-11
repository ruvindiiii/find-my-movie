import { useEffect } from "react";
import { NavLink, useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { RiPlayListAddFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { addToList } from "../watchList/watchList";
import {
  setMovieInfo,
  setMovieInfoTrailer,
  setPurchaseProvider,
  setRentProvider,
} from "./movieInfo";
import { useDispatch, useSelector } from "react-redux";
import { getMovieData, getMovieDataUrl, movieProviders } from "../../api";
import ProviderLogos from "./MovieProviderLogos";

function MovieInfo() {
  const dispatch = useDispatch();
  const { movieInfo, movieInfoTrailer, purcaseProvider, rentProvider } =
    useSelector((state) => state.movieInfo);
  let params = useParams();

  useEffect(() => {
    const GetData = async () => {
      let result = await getMovieData(params.id);
      dispatch(
        setMovieInfo({
          title: result.original_title,
          overview: result.overview,
          id: result.id,
          image: result.poster_path,
        })
      );
    };

    const GetTrailer = async () => {
      let result = await getMovieDataUrl(params.id);

      if (result.results.length) {
        let movieTrailerUrl = `https://www.youtube.com/embed/${result.results[0].key}`;
        dispatch(setMovieInfoTrailer(movieTrailerUrl));
      }
    };

    const GetMovieProviders = async () => {
      let result = await movieProviders(params.id);
      let Us = result.results.US;
      let purchaseProviders = Us.buy.map((providerInfoObj: any) => {
        return {
          provider: providerInfoObj.provider_name,
          logo: providerInfoObj.logo_path,
        };
      });

      dispatch(setPurchaseProvider(purchaseProviders));

      let rentProviders = Us.rent.map((providerInfoObj: any) => {
        return {
          provider: providerInfoObj.provider_name,
          logo: providerInfoObj.logo_path,
        };
      });

      dispatch(setRentProvider(rentProviders));
    };

    GetData();
    GetTrailer();
    GetMovieProviders();
  }, [params.id]);

  const hadleAddToWatchList = async () => {
    toast.success("Added to Watch list!");
    dispatch(addToList(movieInfo));
  };

  return (
    <>
      <div
        className={
          "text-white flex flex-row justify-end items-center pb-[25px] pt-[25px] pr-[40px] gap-3 fixed top-0 left-0 w-full bg-black"
        }
      >
        <NavLink to="/">
          <IoHome className="h-[30px] w-[30px] text-white" />
        </NavLink>

        <RiPlayListAddFill
          className="h-[30px] w-[30px]"
          onClick={hadleAddToWatchList}
        />
      </div>
      <div>
        <iframe
          src={movieInfoTrailer}
          allow="autoplay"
          className="w-full h-[620px] mb-10 mt-[110px]"
          title="video"
        />
        <div className="flex flex-row justify-center items-center">
          <img
            className="rounded-md group/item h-[300px] mr-[20px]"
            src={"https://image.tmdb.org/t/p/w500" + movieInfo.image}
          />
          <p className={"text-white"}>{movieInfo.overview}</p>
        </div>
        <ProviderLogos purchaseProviders={purcaseProvider} />
      </div>

      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default MovieInfo;
