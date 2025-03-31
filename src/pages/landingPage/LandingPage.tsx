import { useEffect } from "react";
import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";
import type { MovieShape } from "../../types";

import MovieList from "../../components/MovieList";
import { useDispatch } from "react-redux";
import {
  setLandingPageMovies,
  setLandingPageTrailers,
  setLandingPageTrailerIndex,
} from "./landingPageMovies";
import { useSelector } from "react-redux";
import { getLandingMovies, getLandingPageTrailers } from "../../api";

interface RootState {
  landingPageMovies: {
    landingMovies: MovieShape[];
    landingTrailers: string[];
    landingTrailerIndex: number;
  };
}

function LandingPage() {
  const dispatch = useDispatch();
  const { landingMovies, landingTrailers, landingTrailerIndex } = useSelector(
    (state: RootState) => state.landingPageMovies
  );

  useEffect(() => {
    const GetData = async () => {
      let result = await getLandingMovies();
      let mappedMovies = result.results.map((obj: any) => {
        return {
          title: obj.title,
          overview: obj.overview,
          image: obj.poster_path,
          id: obj.id,
        };
      });
      dispatch(setLandingPageMovies(mappedMovies));
      const trailers = await getLandingPageTrailers(mappedMovies);
      dispatch(setLandingPageTrailers(trailers));
    };
    GetData();
  }, []);

  const handleNextBtn = () => {
    if (landingTrailerIndex == landingTrailers.length - 1) {
      dispatch(setLandingPageTrailerIndex(0));
    } else {
      dispatch(setLandingPageTrailerIndex(landingTrailerIndex + 1));
    }
  };

  const handlePrevtBtn = () => {
    if (landingTrailerIndex == 0) {
      dispatch(setLandingPageTrailerIndex(landingTrailers.length - 1));
    } else {
      dispatch(setLandingPageTrailerIndex(landingTrailerIndex - 1));
    }
  };
  return (
    <>
      <div>
        <div className="flex flex-row justify-center mb-10 mt-[110px]">
          <button onClick={handlePrevtBtn} className="bg-black color-white">
            <IoCaretBackOutline color="grey" />
          </button>
          <div className="relative w-full pt-[56.25%]">
            <iframe
              src={landingTrailers[landingTrailerIndex]}
              allow="autoplay"
              className="absolute top-0 left-0 w-full h-full"
              title="video"
            />
          </div>
          <button onClick={handleNextBtn} className="bg-black color-white">
            <IoCaretForwardOutline color="grey" />
          </button>
        </div>
        <MovieList movies={landingMovies} />
      </div>
    </>
  );
}

export default LandingPage;
