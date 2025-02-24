import { useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { HiViewList } from "react-icons/hi";
import { IoHome } from "react-icons/io5";
import { addToList } from "../watchList/watchList";
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
  const { token } = useSelector((state) => state.login);
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

          <div className="flex flex-column justify-center items-center">
            <p className={"text-white mb-[20px]"}>{movieInfo.overview}</p>
            <ProviderLogos purchaseProviders={purchaseProviders} />
            <IoMdAdd
              className="h-[30px] w-[30px] text-white "
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
