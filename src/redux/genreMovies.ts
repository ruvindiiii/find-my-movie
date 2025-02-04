import type { MovieShape } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GenreMoviesShape = {
  movies: MovieShape[];
};

const initialGenreMoviesState: GenreMoviesShape = {
  movies: [],
};

export const genreMoviesSlice = createSlice({
  name: "genreMovies",
  initialState: initialGenreMoviesState,
  reducers: {
    setGenreMovies: (state, action: PayloadAction<MovieShape[]>) => {
      state.movies = action.payload;
    },
  },
});

export const { setGenreMovies } = genreMoviesSlice.actions;
