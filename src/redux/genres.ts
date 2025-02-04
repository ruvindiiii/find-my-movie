import type { GenreShape } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GenreStateShape = {
  genres: GenreShape[];
};

const initialGenreState: GenreStateShape = {
  genres: [],
};

export const genreSlice = createSlice({
  name: "genre",
  initialState: initialGenreState,
  reducers: {
    setGenres: (state, action: PayloadAction<GenreShape[]>) => {
      state.genres = action.payload;
    },
  },
});

export const { setGenres } = genreSlice.actions;
