import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InputValueShape = {
  inputValue: string;
};

const initialInputValueState: InputValueShape = {
  inputValue: "",
};

export const headerSearchSlice = createSlice({
  name: "input",
  initialState: initialInputValueState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  },
});

export const { setInputValue } = headerSearchSlice.actions;
