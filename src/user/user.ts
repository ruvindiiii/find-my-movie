import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserShape = {
  token: string;
  country: string;
};

let existingToken = localStorage.getItem("token");
let existingCountry = localStorage.getItem("country");
const initialUserState: UserShape = {
  token: existingToken ? existingToken : "",
  country: existingCountry ? existingCountry : "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", state.token);
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
      localStorage.setItem("country", state.country);
    },
  },
});

export const { setToken, setCountry } = userSlice.actions;
