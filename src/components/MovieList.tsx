import type { MovieShape } from "../types";
import Movie from "./Movie";

type MovieListProps = {
  movies: MovieShape[];
};
function MovieList({ movies }: MovieListProps) {
  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {movies.map((obj: MovieShape) => {
            return <Movie key={obj.id} movie={obj} />;
          })}
        </div>
      </div>
    </>
  );
}

export default MovieList;
