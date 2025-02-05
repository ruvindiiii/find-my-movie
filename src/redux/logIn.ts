import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type loginPageStateShape = {
  userName: string;
  password: string;
  error: string;
};

const initialLoginPageState: loginPageStateShape = {
  userName: "",
  password: "",
  error: "",
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
  },
});

export const { setUserName, setPassword, setError } = logInSlice.actions;
