import type { MovieShape } from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WatchListStateType = {
  list: MovieShape[];
};

var watchListItems = JSON.parse(localStorage.getItem("watchListItems") || "[]");

const initialState: WatchListStateType = {
  list: watchListItems,
};

export const watchListSlice = createSlice({
  name: "watchList",
  initialState: initialState,
  reducers: {
    addToList: (state, action: PayloadAction<MovieShape>) => {
      state.list.push(action.payload);

      localStorage.setItem("watchListItems", JSON.stringify(state.list));
    },
    removeFromList: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((movieObj) => {
        return movieObj.id !== action.payload;
      });
      localStorage.setItem("watchListItems", JSON.stringify(state.list));
    },
  },
});

export const { addToList, removeFromList } = watchListSlice.actions;
