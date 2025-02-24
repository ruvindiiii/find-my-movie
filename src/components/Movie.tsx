import { NavLink } from "react-router";
import type { MovieShape } from "../types";

type MovieProps = {
  movie: MovieShape;
};

function Movie(props: MovieProps) {
  return (
    <div className="hover:scale-110 hover:shadow-lg transition duration-300 w-[200px]">
      <NavLink to={`/movie-info/${props.movie.id}`}>
        <img
          className="rounded-md group/item hover:bg-slate-100 ..."
          src={"https://image.tmdb.org/t/p/w500" + props.movie.image}
        />
      </NavLink>
    </div>
  );
}

export default Movie;
