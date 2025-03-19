import { useEffect } from "react";
import MovieList from "./MovieList";
import { useSelector, useDispatch } from "react-redux";
import { setSearchResults } from "../header/headerSearch";
import { findMovies } from "../api";

function SearchMovies() {
  const dispatch = useDispatch();
  const { inputValue, searchResult } = useSelector(
    (state) => state.headerSearch
  );

  useEffect(() => {
    const FindMovie = async () => {
      let movieResults = await findMovies(inputValue);

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
