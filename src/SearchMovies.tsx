import { useEffect, useState } from "react";
import type { MovieShape } from "./types";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
const bearer =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNThkZDVjOTUxZGU3NDgxMmQ0N2VhYWM1Nzc1NGQ0NiIsIm5iZiI6MTY5NTk4NjU2My45MjMsInN1YiI6IjY1MTZiMzgzOTY3Y2M3MDBhY2I4NjZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sYLz8lc9f6Wzx3VIDSVSfLYOhTgPClAOEpPVhO8jIAM";

function SearchMovies() {
  const { inputValue } = useSelector((state) => state.headerSearch);
  const [searchResults, setSearchResults] = useState<MovieShape[]>([]);

  useEffect(() => {
    const FindMovie = async () => {
      let url = `https://api.themoviedb.org/3/search/movie?&query=${inputValue}`;
      let response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: bearer,
        },
      });
      let movieResults = await response.json();
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
      console.log(movieResults);
      setSearchResults(searchedMovies);
    };

    FindMovie();
  }, [inputValue]);

  return (
    <>
      <div>
        <MovieList movies={searchResults} />
      </div>
    </>
  );
}

export default SearchMovies;
