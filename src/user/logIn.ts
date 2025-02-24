import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type loginPageStateShape = {
  userName: string;
  password: string;
  error: string;
  token: string;
};
let existingToken = localStorage.getItem("token");
const initialLoginPageState: loginPageStateShape = {
  userName: "",
  password: "",
  error: "",
  token: existingToken ? existingToken : "",
};

export const logInSlice = createSlice({
  name: "login",
  initialState: initialLoginPageState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;

      localStorage.setItem("token", state.token);
    },
  },
});

export const { setUserName, setPassword, setError, setToken } =
  logInSlice.actions;
