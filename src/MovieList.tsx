import type { MovieShape } from "./types";
import { NavLink } from "react-router";

type MovieListProps = {
  movies: MovieShape[];
};
function MovieList({ movies }: MovieListProps) {
  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        {movies.map((obj: MovieShape) => {
          return (
            <div className="hover:scale-110 hover:shadow-lg transition duration-300">
              <NavLink to={`/movie-info/${obj.id}`}>
                <img
                  className="rounded-md group/item hover:bg-slate-100 ..."
                  src={"https://image.tmdb.org/t/p/w500" + obj.image}
                />
              </NavLink>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MovieList;
