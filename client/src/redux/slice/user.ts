import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IUserFormData } from "../../interfaces/user";

interface IUserState {
  currentUser: IUserFormData | null;
  errorMessage: string | null;
  isLoading: boolean;
}

const initialState: IUserState = {
  currentUser: null,
  errorMessage: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    },
    loginSuccess: (state, action: PayloadAction<IUserFormData>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;

export default userSlice.reducer;
