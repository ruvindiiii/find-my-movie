import { NavLink } from "react-router";
import type { MovieShape } from "../types";

type MovieProps = {
  movie: MovieShape;
};

function Movie(props: MovieProps) {
  return (
    <div className="hover:scale-110 hover:shadow-lg transition duration-300 w-full">
      <NavLink to={`/movie-info/${props.movie.id}`}>
        <img
          className="rounded-md w-full h-auto object-cover aspect-[2/3]"
          src={"https://image.tmdb.org/t/p/w500" + props.movie.image}
          alt={props.movie.title}
        />
      </NavLink>
    </div>
  );
}

export default Movie;
