import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieShape } from "../types";

type MovieInfoShape = {
  movieInfo: MovieShape[];
  movieInfoTrailer: string;
};

const initialMovieInfoState: MovieInfoShape = {
  movieInfo: [],
  movieInfoTrailer: "",
};

export const movieInfoSlice = createSlice({
  name: "movieInfo",
  initialState: initialMovieInfoState,
  reducers: {
    setMovieInfo: (state, action: PayloadAction<MovieShape[]>) => {
      state.movieInfo = action.payload;
    },
    setMovieInfoTrailer: (state, action: PayloadAction<string>) => {
      state.movieInfoTrailer = action.payload;
    },
  },
});

export const { setMovieInfo, setMovieInfoTrailer } = movieInfoSlice.actions;
