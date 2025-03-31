import { useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { addToList } from "../watchList/watchList";
import { Rate } from "antd";
import {
  setMovieInfo,
  setMovieInfoTrailer,
  setPurchaseProviders,
  setRentProvider,
} from "./movieInfo";
import { useDispatch, useSelector } from "react-redux";
import { getMovieData, getMovieDataUrl, movieProviders } from "../../api";
import ProviderLogos from "./ProviderLogos";

function MovieInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movieInfo, movieInfoTrailer, purchaseProviders, rentProvider } =
    useSelector((state) => state.movieInfo);
  const { token } = useSelector((state) => state.user);
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
          rating: result.vote_average,
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
      if (Us) {
        let purchaseProviders = Us.buy.map((providerInfoObj: any) => {
          return {
            name: providerInfoObj.provider_name,
            logo: providerInfoObj.logo_path,
          };
        });
        dispatch(setPurchaseProviders(purchaseProviders));
      } else {
        dispatch(setPurchaseProviders([]));
      }

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
    if (!token) {
      navigate("/user-login");
      return;
    }
    dispatch(
      addToList({
        movie: {
          title: movieInfo.title,
          overview: movieInfo.overview,
          image: movieInfo.image,
          id: movieInfo.id,
          providers: purchaseProviders,
        },
        token,
      })
    );
    toast.success("Added to Watch list!");
  };

  return (
    <>
      <div className="container-xl mb-10">
        <iframe
          src={movieInfoTrailer}
          allow="autoplay"
          className="w-full h-[620px] mb-10 mt-[110px]"
          title="video"
        />
        <hr className="text-white mb-5 mt-10" />
        <div className="flex flex-row flex-wrap justify-center items-center">
          <img
            className="rounded-md group/item mr-[20px] flex-[1]"
            src={"https://image.tmdb.org/t/p/w500" + movieInfo.image}
          />

          <div className="flex flex-column items-center flex-[2]">
            <h1 className="text-white mb-10 font-bold pt-10">
              {movieInfo.title}
            </h1>
            <p className="text-white mb-[20px] text-xl">{movieInfo.overview}</p>
            <p className="text-white mb-3 mt-3">{movieInfo.rating} / 10</p>
            <Rate count={10} value={movieInfo.rating} />;
            <ProviderLogos purchaseProviders={purchaseProviders} />
            <span className="text-white mb-[20px] text-xl">
              Add To Watchlist
            </span>
            <IoMdAdd
              className="h-[30px] w-[30px] text-white"
              onClick={hadleAddToWatchList}
            />
          </div>
        </div>
      </div>

      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default MovieInfo;
