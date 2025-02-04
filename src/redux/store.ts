import { configureStore } from "@reduxjs/toolkit";
import { genreSlice } from "./genres";
import { watchListSlice } from "./watchList";
import { genreMoviesSlice } from "./genreMovies";
import { landingPageMoviesSlice } from "./landingPageMovies";
import { movieInfoSlice } from "./movieInfo";
import { headerSearchSlice } from "./headerSearch";

const store = configureStore({
  reducer: {
    watchList: watchListSlice.reducer,
    genre: genreSlice.reducer,
    genreMovies: genreMoviesSlice.reducer,
    landingPageMovies: landingPageMoviesSlice.reducer,
    movieInfo: movieInfoSlice.reducer,
    headerSearch: headerSearchSlice.reducer,
  },
});

export default store;
