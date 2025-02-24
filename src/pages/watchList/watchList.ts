import type {
  MovieWithProviders,
  MovieWithToken,
  MovieIdWithToken,
} from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistListToDb } from "../../api";

type WatchListStateType = {
  list: MovieWithProviders[];
};

const initialState: WatchListStateType = {
  list: [],
};

export const watchListSlice = createSlice({
  name: "watchList",
  initialState: initialState,
  reducers: {
    setList: (state, action: PayloadAction<MovieWithProviders[]>) => {
      state.list = action.payload;
    },
    addToList: (state, action: PayloadAction<MovieWithToken>) => {
      let filteredArr = state.list.filter((movieWithProvidersObj) => {
        return movieWithProvidersObj.id === action.payload.movie.id;
      });
      if (!filteredArr.length) {
        state.list.push(action.payload.movie);
        persistListToDb(state.list, action.payload.token);
      }
    },
    removeFromList: (state, action: PayloadAction<MovieIdWithToken>) => {
      state.list = state.list.filter((movieObj) => {
        return movieObj.id !== action.payload.movieId;
      });

      persistListToDb(state.list, action.payload.token);
    },
  },
});

export const { addToList, removeFromList, setList } = watchListSlice.actions;
