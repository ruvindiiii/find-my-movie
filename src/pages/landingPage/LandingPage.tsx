import { useEffect } from "react";
import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";

import MovieList from "../../components/MovieList";
import { useDispatch } from "react-redux";
import {
  setLandingPageMovies,
  setLandingPageTrailers,
  setLandingPageTrailerIndex,
} from "./landingPageMovies";
import { useSelector } from "react-redux";
import { getLandingMovies } from "../../api";

const bearer =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNThkZDVjOTUxZGU3NDgxMmQ0N2VhYWM1Nzc1NGQ0NiIsIm5iZiI6MTY5NTk4NjU2My45MjMsInN1YiI6IjY1MTZiMzgzOTY3Y2M3MDBhY2I4NjZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sYLz8lc9f6Wzx3VIDSVSfLYOhTgPClAOEpPVhO8jIAM";

function LandingPage() {
  const dispatch = useDispatch();
  const { landingMovies, landingTrailers, landingTrailerIndex } = useSelector(
    (state) => state.landingPageMovies
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

      let movieDetailFetchUrlArr = mappedMovies.map((listItem: any) => {
        return `https://api.themoviedb.org/3/movie/${listItem.id}/videos`;
      });

      let trailerKeyArr = [];
      for (let i = 0; i < movieDetailFetchUrlArr.length; i++) {
        let response = await fetch(movieDetailFetchUrlArr[i], {
          method: "GET",
          headers: {
            Authorization: bearer,
          },
        });
        result = await response.json();

        if (result.results.length) {
          trailerKeyArr.push(
            `https://www.youtube.com/embed/${result.results[0].key}`
          );
        }
      }

      dispatch(setLandingPageTrailers(trailerKeyArr));
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
        <div className="flex flex-row justify-center mb-10">
          <button onClick={handlePrevtBtn} className="bg-black color-white">
            <IoCaretBackOutline color="grey" />
          </button>
          <iframe
            src={landingTrailers[landingTrailerIndex]}
            allow="autoplay"
            className="w-full h-[620px]"
            title="video"
          />
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
