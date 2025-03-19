import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SignUpPageStateShape = {
  password: string;
  userName: string;
  name: string;
  countries: CountryInfo[];
  selectedCoutry: string;
};

export type CountryInfo = {
  displayName: string;
  code: string;
};

const initialSignUpState: SignUpPageStateShape = {
  password: "",
  userName: "",
  name: "",
  countries: [],
  selectedCoutry: "",
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
    setCountries: (state, action: PayloadAction<CountryInfo[]>) => {
      state.countries = action.payload;
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCoutry = action.payload;
    },
  },
});

export const {
  setPassWord,
  setUserName,
  setName,
  setCountries,
  setSelectedCountry,
} = SignUpPageSlice.actions;
