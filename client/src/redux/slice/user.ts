import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../../interfaces/user";

interface IUserState {
  currentUser: IUser | null;
  error: string | null;
  loading: boolean;
}

const initialState: IUserState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: ({ loading, error }) => {
      loading = true;
      error = null;
    },
    loginSuccess: ({ currentUser, loading }, action: PayloadAction<IUser>) => {
      currentUser = action.payload;
      loading = false;
    },
    loginFailure: ({ error, loading }, action: PayloadAction<string>) => {
      error = action.payload;
      loading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;

export default userSlice.reducer;
