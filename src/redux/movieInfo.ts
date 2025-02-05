import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieShape, MovieProviderShape } from "../types";

type MovieInfoShape = {
  movieInfo: MovieShape;
  movieInfoTrailer: string;
  purcaseProvider: MovieProviderShape[];
  rentProvider: MovieProviderShape[];
};

const initialMovieInfoState: MovieInfoShape = {
  movieInfo: { title: "", overview: "", id: 0, image: "" },
  movieInfoTrailer: "",
  purcaseProvider: [],
  rentProvider: [],
};

export const movieInfoSlice = createSlice({
  name: "movieInfo",
  initialState: initialMovieInfoState,
  reducers: {
    setMovieInfo: (state, action: PayloadAction<MovieShape>) => {
      state.movieInfo = action.payload;
    },
    setMovieInfoTrailer: (state, action: PayloadAction<string>) => {
      state.movieInfoTrailer = action.payload;
    },
    setPurchaseProvider: (
      state,
      action: PayloadAction<MovieProviderShape[]>
    ) => {
      state.purcaseProvider = action.payload;
    },
    setRentProvider: (state, action: PayloadAction<MovieProviderShape[]>) => {
      state.rentProvider = action.payload;
    },
  },
});

export const {
  setMovieInfo,
  setMovieInfoTrailer,
  setPurchaseProvider,
  setRentProvider,
} = movieInfoSlice.actions;
