import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { RiPlayListAddFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { addToList } from "./redux/watchList";
import { setMovieInfo, setMovieInfoTrailer } from "./redux/movieInfo";
import { useDispatch, useSelector } from "react-redux";

const bearer =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNThkZDVjOTUxZGU3NDgxMmQ0N2VhYWM1Nzc1NGQ0NiIsIm5iZiI6MTY5NTk4NjU2My45MjMsInN1YiI6IjY1MTZiMzgzOTY3Y2M3MDBhY2I4NjZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sYLz8lc9f6Wzx3VIDSVSfLYOhTgPClAOEpPVhO8jIAM";

function MovieInfo() {
  const dispatch = useDispatch();
  const { movieInfo, movieInfoTrailer } = useSelector(
    (state) => state.movieInfo
  );
  let params = useParams();
  useEffect(() => {
    const GetData = async () => {
      let url = `https://api.themoviedb.org/3/movie/${params.id}`;
      let response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: bearer,
        },
      });

      let result = await response.json();
      dispatch(
        setMovieInfo({
          title: result.original_title,
          overview: result.overview,
          id: result.id,
          image: result.poster_path,
        })
      );

      console.log(result);
    };

    const GetTrailer = async () => {
      let movieInfoUrl = `https://api.themoviedb.org/3/movie/${params.id}/videos`;
      let response = await fetch(movieInfoUrl, {
        method: "GET",
        headers: {
          Authorization: bearer,
        },
      });
      let result = await response.json();

      if (result.results.length) {
        let movieTrailerUrl = `https://www.youtube.com/embed/${result.results[0].key}`;
        dispatch(setMovieInfoTrailer(movieTrailerUrl));
      }
    };

    GetData();
    GetTrailer();
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
