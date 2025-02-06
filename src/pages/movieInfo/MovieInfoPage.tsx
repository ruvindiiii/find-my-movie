import { useEffect, useState } from "react";
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
import { MovieProviderShape } from "../../types";

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
      <div>
        <iframe
          src={movieInfoTrailer}
          allow="autoplay"
          className="w-full h-[620px] mb-10"
          title="video"
        />
        {/* <h1>{movieInfo.title}</h1> */}
        <div className="flex flex-row justify-center items-center">
          <img
            className="rounded-md group/item h-[300px] mr-[20px]"
            src={"https://image.tmdb.org/t/p/w500" + movieInfo.image}
          />
          <p className={"text-white"}>{movieInfo.overview}</p>
        </div>
        <div>
          {purcaseProvider.map((providerObj: MovieProviderShape) => {
            return (
              <div>
                {providerObj.provider}
                <img
                  src={"https://image.tmdb.org/t/p/w500" + providerObj.logo}
                />
              </div>
            );
          })}
        </div>
      </div>
      <NavLink to="/">
        <button>
          <IoHome className="h-[20px] w-[20px]" />
        </button>
      </NavLink>
      <button onClick={hadleAddToWatchList}>
        <RiPlayListAddFill className="h-[20px] w-[20px]" />
      </button>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default MovieInfo;
