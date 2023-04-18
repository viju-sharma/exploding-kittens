import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
// import type { RootState } from ".";

interface AuthState {
  id: string;
  username: string;
  email: string;
}
const initialState: AuthState = {
  id: "",
  username: "",
  email: "",
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      const { id, username, email } = action.payload;
      state.id = id;
      state.username = username;
      state.email = email;
    },
    logout: (state) => {
      state = initialState;
      localStorage.removeItem("token");
      window.location.reload()
    },
  },
});

export const { login, logout } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const userId = (state: RootState) => state.auth.id;

export default authSlice.reducer;
