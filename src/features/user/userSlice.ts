import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string | null;
  isLogged: boolean;
}

const initialState: UserState = {
  name: null,
  isLogged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.isLogged = true;
    },
    logout: (state) => {
      state.name = null;
      state.isLogged = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
