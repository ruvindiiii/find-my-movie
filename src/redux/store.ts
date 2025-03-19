import { configureStore } from "@reduxjs/toolkit";
import { genreSlice } from "../header/genres";
import { watchListSlice } from "../pages/watchList/watchList";
import { genreMoviesSlice } from "../pages/genreView/genreMovies";
import { landingPageMoviesSlice } from "../pages/landingPage/landingPageMovies";
import { movieInfoSlice } from "../pages/movieInfo/movieInfo";
import { headerSearchSlice } from "../header/headerSearch";
import { SignUpPageSlice } from "../user/signUp";
import { logInSlice } from "../user/logIn";
import { userSlice } from "../user/user";

const store = configureStore({
  reducer: {
    watchList: watchListSlice.reducer,
    genre: genreSlice.reducer,
    genreMovies: genreMoviesSlice.reducer,
    landingPageMovies: landingPageMoviesSlice.reducer,
    movieInfo: movieInfoSlice.reducer,
    headerSearch: headerSearchSlice.reducer,
    signUp: SignUpPageSlice.reducer,
    login: logInSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
