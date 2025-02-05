import { useEffect, useState } from "react";
import type { MovieShape } from "./types";
import MovieList from "./MovieList";
import { useSelector, useDispatch } from "react-redux";
import { setSearchResults } from "./redux/headerSearch";
import { findMovies } from "./api";

const bearer =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNThkZDVjOTUxZGU3NDgxMmQ0N2VhYWM1Nzc1NGQ0NiIsIm5iZiI6MTY5NTk4NjU2My45MjMsInN1YiI6IjY1MTZiMzgzOTY3Y2M3MDBhY2I4NjZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sYLz8lc9f6Wzx3VIDSVSfLYOhTgPClAOEpPVhO8jIAM";

function SearchMovies() {
  const dispatch = useDispatch();
  const { inputValue, searchResult } = useSelector(
    (state) => state.headerSearch
  );

  useEffect(() => {
    const FindMovie = async () => {
      let movieResults = await findMovies();

      let searchedMovies = movieResults.results
        .filter((movie: any) => movie.poster_path)
        .map((movieObj: any) => {
          return {
            title: movieObj.title,
            overview: movieObj.overview,
            image: movieObj.poster_path,
            id: movieObj.id,
          };
        });

      dispatch(setSearchResults(searchedMovies));
    };

    FindMovie();
  }, [inputValue]);

  return (
    <>
      <div>
        <MovieList movies={searchResult} />
      </div>
    </>
  );
}

export default SearchMovies;
