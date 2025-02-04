import type { MovieShape } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LandingPageMoviesShape = {
  landingMovies: MovieShape[];
  landingTrailerIndex: number;
  landingTrailers: string[];
};

const landingPageMovies: LandingPageMoviesShape = {
  landingMovies: [],
  landingTrailerIndex: 0,
  landingTrailers: [],
};

export const landingPageMoviesSlice = createSlice({
  name: "landingMovies",
  initialState: landingPageMovies,
  reducers: {
    setLandingPageMovies: (state, action: PayloadAction<MovieShape[]>) => {
      state.landingMovies = action.payload;
    },
    setLandingPageTrailerIndex: (state, action: PayloadAction<number>) => {
      state.landingTrailerIndex = action.payload;
    },
    setLandingPageTrailers: (state, action: PayloadAction<string[]>) => {
      state.landingTrailers = action.payload;
    },
  },
});

export const {
  setLandingPageMovies,
  setLandingPageTrailers,
  setLandingPageTrailerIndex,
} = landingPageMoviesSlice.actions;
