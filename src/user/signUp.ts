import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SignUpPageStateShape = {
  password: string;
  userName: string;
  name: string;
};

const initialSignUpState: SignUpPageStateShape = {
  password: "",
  userName: "",
  name: "",
};
export const SignUpPageSlice = createSlice({
  name: "signUp",
  initialState: initialSignUpState,
  reducers: {
    setPassWord: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setPassWord, setUserName, setName } = SignUpPageSlice.actions;
