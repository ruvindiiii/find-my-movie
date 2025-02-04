import { useEffect } from "react";
import { useParams } from "react-router";

import MovieList from "./MovieList";
import { useDispatch } from "react-redux";
import { setGenreMovies } from "./redux/genreMovies";
import { useSelector } from "react-redux";

const bearer =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNThkZDVjOTUxZGU3NDgxMmQ0N2VhYWM1Nzc1NGQ0NiIsIm5iZiI6MTY5NTk4NjU2My45MjMsInN1YiI6IjY1MTZiMzgzOTY3Y2M3MDBhY2I4NjZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sYLz8lc9f6Wzx3VIDSVSfLYOhTgPClAOEpPVhO8jIAM";

function GenreView() {
  const dispatch = useDispatch();

  const { movies } = useSelector((state) => state.genreMovies);

  let params = useParams();
  useEffect(() => {
    const GetGenreMovies = async () => {
      let url = `https://api.themoviedb.org/3/discover/movie?with_genres=${params.id}`;
      let response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: bearer,
        },
      });
      let result = await response.json();
      let genreMovieArr = result.results.map((obj: any) => {
        return {
          title: obj.title,
          overview: obj.overview,
          image: obj.poster_path,
          id: obj.id,
        };
      });
      dispatch(setGenreMovies(genreMovieArr));
    };
    GetGenreMovies();
  }, [params.id]);

  return (
    <>
      <div className="text-white">
        <MovieList movies={movies} />
      </div>
    </>
  );
}

export default GenreView;
