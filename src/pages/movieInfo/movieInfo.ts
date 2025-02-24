import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieShape, MovieProviderShape } from "../../types";

type MovieInfoShape = {
  movieInfo: MovieShape;
  movieInfoTrailer: string;
  purchaseProviders: MovieProviderShape[];
  rentProvider: MovieProviderShape[];
};

const initialMovieInfoState: MovieInfoShape = {
  movieInfo: { title: "", overview: "", id: 0, image: "" },
  movieInfoTrailer: "",
  purchaseProviders: [],
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
    setPurchaseProviders: (
      state,
      action: PayloadAction<MovieProviderShape[]>
    ) => {
      state.purchaseProviders = action.payload;
    },
    setRentProvider: (state, action: PayloadAction<MovieProviderShape[]>) => {
      state.rentProvider = action.payload;
    },
  },
});

export const {
  setMovieInfo,
  setMovieInfoTrailer,
  setPurchaseProviders,
  setRentProvider,
} = movieInfoSlice.actions;
