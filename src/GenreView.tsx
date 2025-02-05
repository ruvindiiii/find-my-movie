import { useEffect } from "react";
import { useParams } from "react-router";

import MovieList from "./MovieList";
import { useDispatch } from "react-redux";
import { setGenreMovies } from "./redux/genreMovies";
import { useSelector } from "react-redux";
import { genreMovies } from "./api";

function GenreView() {
  const dispatch = useDispatch();

  const { movies } = useSelector((state) => state.genreMovies);

  let params = useParams();
  useEffect(() => {
    const GetGenreMovies = async () => {
      let result = await genreMovies(params.id);
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
