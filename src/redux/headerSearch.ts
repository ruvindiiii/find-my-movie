import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieShape } from "../types";

type InputValueShape = {
  inputValue: string;
  searchResult: MovieShape[];
};

const initialInputValueState: InputValueShape = {
  inputValue: "",
  searchResult: [],
};

export const headerSearchSlice = createSlice({
  name: "input",
  initialState: initialInputValueState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<MovieShape[]>) => {
      state.searchResult = action.payload;
    },
  },
});

export const { setInputValue, setSearchResults } = headerSearchSlice.actions;
