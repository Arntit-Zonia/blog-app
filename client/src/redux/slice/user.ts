import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../interfaces/user";

interface IProfile {
  picture: string;
}

interface IUserState {
  currentUser: IUser | null;
  errorMessage: string | null;
  isLoading: boolean;
  profile: IProfile | null;
}

const initialState: IUserState = {
  currentUser: null,
  errorMessage: null,
  isLoading: false,
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    },
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.errorMessage = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;

export default userSlice.reducer;
