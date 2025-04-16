import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface IAuthState {
  access_token: string | null;
  isRedirectToSignIn: boolean;
  isAuth: boolean;
}

const initialState: IAuthState = {
  access_token: null,
  isRedirectToSignIn: false,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateToken(state, action: PayloadAction<string | null>) {
      state.access_token = action.payload;
    },

    setRedirectToSignIn(state, action: PayloadAction<boolean>) {
      state.isRedirectToSignIn = action.payload;
    },

    clearStore(state, action: PayloadAction<boolean>) {
      state.access_token = null;
    },
  },
});

export const selectIsAuth = (state: RootState) =>
  state.auth.access_token ||
  localStorage.getItem("auth") ||
  sessionStorage.getItem("auth");

export const { updateToken, setRedirectToSignIn, clearStore } =
  authSlice.actions;
