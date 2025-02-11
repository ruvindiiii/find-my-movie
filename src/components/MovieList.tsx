import type { MovieShape } from "../types";
import Movie from "./Movie";

type MovieListProps = {
  movies: MovieShape[];
};
function MovieList({ movies }: MovieListProps) {
  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        {movies.map((obj: MovieShape) => {
          return <Movie movie={obj} />;
        })}
      </div>
    </>
  );
}

export default MovieList;
